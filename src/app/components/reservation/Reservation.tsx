"use client";
import React, { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from "./reservation.module.scss";
import dayjs, { Dayjs } from "dayjs";
import { Button, FormControl, ThemeOptions } from "@mui/material";
import {
  createTheme,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import { useGetOpeningHoursQuery } from "@/app/utils/getOpeningHours.rq.generated";
import { useGetTablesQuery } from "./getTables.rq.generated";
import GuestsInput from "../guestsInput/GuestsInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import utc from "dayjs/plugin/utc";
import { CalendarMonth } from "@mui/icons-material";
import ReservationModal, { Props } from "../modal/ReservationModal";

dayjs.extend(utc);

type ReservationDataProps = Pick<Props, "tableId" | "time">;

//Same order as dayjs weekdays (https://day.js.org/docs/en/get-set/day)
const weekDaysOrder = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#203881",
    },
    secondary: {
      main: "#f5ead6",
    },
    background: {
      default: "#fff",
      paper: "#E3E7F3",
    },
    text: {
      primary: "#222429",
      secondary: "#203881",
      disabled: "rgba(34,36,41,0.51)",
    },
  },
});

const popperSx: SxProps<Theme> = (theme) => ({
  "& .MuiPaper-root": {
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiPickersCalendarHeader-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiDateCalendar-root": {
    padding: "0.5rem",
  },
  "& .MuiSvgIcon-root": { color: theme.palette.primary.main },
  "& .MuiPickersSlideTransition-root": {
    borderRadius: "10px",
  },
});

export default function Reservation() {
  const refId = useRef<HTMLElement>(null);

  const [guestNumber, setGuestNumber] = useState<number>(1);
  const [reservationDate, setReservationDate] = useState<Dayjs | null>(dayjs());
  const [reservationData, setReservationData] = useState<ReservationDataProps>({
    time: "",
    tableId: [],
  });
  const [slots, setSlots] = useState<Dayjs[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: openingHours } = useGetOpeningHoursQuery();
  const startOfDay = reservationDate?.startOf("day").utc().format();
  const endOfDay = reservationDate?.endOf("day").utc().format();
  const { data: tables } = useGetTablesQuery({
    guests: guestNumber,
    reservationDay: startOfDay,
    endOfDay: endOfDay,
  });

  const handleChangeGuests = (newGuestNumber: number) => {
    setGuestNumber(newGuestNumber);
  };
  const handleChangeDate = (newValue: Dayjs | null) =>
    setReservationDate(newValue);
  const handleClickModal = () => setIsOpen(!isOpen);

  const slotsByTableId = slots.map((slot) => {
    const ids = tables?.tables?.data
      .reduce<string[]>((acc, table) => {
        const reservations = table.attributes?.reservations?.data;
        if (reservations.length === 0) {
          console.log("hello", table.id, reservations);
          return [...acc, table.id];
        }

        const reservationsOnTable = table.attributes?.reservations?.data.find(
          (reservation) => {
            return (
              dayjs(reservation.attributes?.reservationDate)
                .utc()
                .format("H:mm") === slot.add(1, "day").utc().format("H:mm")
            );
          }
        );
        if (!reservationsOnTable) {
          return [...acc, table.id];
        }

        return acc;
      }, [])
      .filter((id) => id);

    return {
      slot: slot,
      id: ids ?? [],
    };
  });
  console.log(slotsByTableId);

  // Order tables from most seats to least seats
  const sortedTables =
    tables?.tables?.data &&
    tables.tables.data.sort((a, b) => {
      return a.attributes?.seats && b.attributes?.seats
        ? a.attributes?.seats <= b.attributes?.seats
          ? 1
          : -1
        : 0;
    });

  useEffect(() => {
    const date = dayjs(reservationDate).toISOString().slice(0, 10);
    openingHours?.openingHours?.data.forEach((item, index) => {
      // gets the opening times for the current value of the calendar
      if (weekDaysOrder[dayjs(date).day()] === item.attributes?.day) {
        // Checks if the restaurant is open on that day
        if (openingHours?.openingHours?.data[index].attributes?.open) {
          const allSlots: Dayjs[] = [];
          const start = `${date} ${openingHours?.openingHours?.data[
            index
          ].attributes?.openingTime.slice(0, 5)}`;
          const end = `${date} ${openingHours?.openingHours?.data[
            index
          ].attributes?.closingTime.slice(0, 5)}`;
          // adds reservation slots at 30 minute intervals
          for (
            let current = dayjs(start).utc().add(1, "hour");
            // TODO: add a kitchen closes time on Strapi and make it the end time instead of setting it 2 hours before close time
            // Last slot is two hours and 30 minutes before closing time
            current.isBefore(dayjs(end).subtract(2, "hour"));
            current = current.add(30, "minutes")
          ) {
            allSlots.push(current);
          }
          setSlots([...allSlots]);
        } else {
          // if the restaurant is closed
          setSlots([]);
        }
      }
    });
  }, [reservationDate, openingHours]);

  return (
    sortedTables?.[0].attributes?.seats && (
      <div className={styles.background}>
        <section
          ref={refId}
          className={`container ${styles.reservation}`}
          id="tables"
        >
          <h2> Book a table</h2>

          <ThemeProvider theme={themeOptions}>
            <FormControl className={styles.form}>
              <GuestsInput
                sortedTables={sortedTables}
                guestNumber={guestNumber}
                onGuestNumberChange={handleChangeGuests}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a date"
                  format="D MMM. YYYY"
                  disablePast
                  dayOfWeekFormatter={(day) => ` ${day + "."}`}
                  value={reservationDate}
                  onChange={handleChangeDate}
                  showDaysOutsideCurrentMonth
                  views={["day", "month"]}
                  slots={{ openPickerIcon: CalendarMonth }}
                  sx={(theme) => ({
                    "& .MuiInputBase-root": {
                      color: theme.palette.primary.main,
                    },
                    "& .MuiSvgIcon-root": { color: theme.palette.primary.main },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  })}
                  slotProps={{
                    layout: {
                      sx: { borderRadius: "4px" },
                    },
                    popper: {
                      sx: popperSx,
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </ThemeProvider>

          <div className={styles.slots}>
            {slots.length > 0 ? (
              slotsByTableId.map((data) => {
                const time = data.slot.toISOString();
                return (
                  <button
                    className={
                      time === reservationData.time
                        ? styles.selectedTime
                        : styles.button
                    }
                    key={time}
                    onClick={() =>
                      setReservationData({
                        time,
                        tableId: data.id,
                      })
                    }
                  >
                    {dayjs(data.slot).format("H:mm")}
                  </button>
                );
              })
            ) : (
              <h4>Restaurant closed</h4>
            )}
          </div>

          {
            <Button
              disabled={!reservationData.time}
              variant="contained"
              onClick={handleClickModal}
              sx={{
                backgroundColor: "rgba(32, 56, 129, 1)",
                width: "30%",
                fontFamily: "var(--font-lora)",
                letterSpacing: "0.1857em",
                ":hover": {
                  backgroundColor: "rgba(32, 56, 129, 1)",
                  opacity: "0.8",
                },
              }}
            >
              Continue
            </Button>
          }

          {isOpen && (
            <ReservationModal
              openModal
              onClose={handleClickModal}
              guests={guestNumber}
              time={reservationData.time}
              tableId={reservationData.tableId}
            />
          )}
        </section>
      </div>
    )
  );
}
