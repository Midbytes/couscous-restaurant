"use client";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from "./reservation.module.scss";
import dayjs, { Dayjs } from "dayjs";
import { FormControl, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGetOpeningHoursQuery } from "@/app/utils/getOpeningHours.rq.generated";
import { useGetTablesQuery } from "./getTables.rq.generated";
import GuestsInput from "../guestsInput/GuestsInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";

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
      paper: "#fff",
    },
    text: {
      primary: "#222429",
      secondary: "#203881",
      disabled: "rgba(34,36,41,0.51)",
    },
  },
});

export default function Reservation() {
  const { data: tables } = useGetTablesQuery();
  const { data: openingHours } = useGetOpeningHoursQuery();
  const [reservationDate, setReservationDate] = useState<Dayjs | null>(dayjs());
  const [slots, setSlots] = useState<Dayjs[]>([]);

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
            let current = dayjs(start);
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

  const handleChangeDate = (newValue: Dayjs | null) =>
    setReservationDate(newValue);

  return (
    sortedTables?.[0].attributes?.seats && (
      <section className={`container ${styles.reservation}`}>
        <ThemeProvider theme={themeOptions}>
          <FormControl className={styles.form}>
            <GuestsInput sortedTables={sortedTables} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Reservation date"
                disablePast
                displayWeekNumber
                value={reservationDate}
                onChange={handleChangeDate}
              />
            </LocalizationProvider>
            {slots.map((time, index) => {
              return <button key={index}>{dayjs(time).format("H:mm")}</button>;
            })}
          </FormControl>
        </ThemeProvider>
      </section>
    )
  );
}
