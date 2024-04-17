import IconButton from "@mui/material/IconButton/IconButton";
import Input from "@mui/material/Input/Input";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { GetTablesQuery } from "../reservation/getTables.rq.generated";
import { Unpacked } from "@/app/types/utils";
import { InputLabel } from "@mui/material";
import styles from "./guestInput.module.scss";

type SortedTables = Unpacked<NonNullable<GetTablesQuery["tables"]>>["data"];

interface GuestsInputProps {
  sortedTables: SortedTables;
  guestNumber: number;
  onGuestNumberChange: (newGuestNumber: number) => void;
}

export default function GuestsInput({
  sortedTables,
  guestNumber,
  onGuestNumberChange,
}: GuestsInputProps) {
  const handleChangeGuests = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuestNumber = e.target.valueAsNumber;
    onGuestNumberChange(newGuestNumber);
  };

  const handleIncrement = (type: "remove" | "add") => {
    if (!guestNumber) onGuestNumberChange(1);
    else {
      const newGuestNumber =
        type === "remove" ? guestNumber - 1 : guestNumber + 1;
      onGuestNumberChange(newGuestNumber);
    }
  };

  return (
    sortedTables[0].attributes?.seats && (
      <>
        <InputLabel
          sx={{
            zIndex: "1",
            backgroundColor: "var(--background-secondary)",
            padding: "0 5px 0 5px",
          }}
        >
          Guests
        </InputLabel>
        <div className={styles.input}>
          <Input
            sx={{
              border: "1px solid var(--main-title-color)",
              borderRadius: "4px",
            }}
            disableUnderline
            error={
              guestNumber > sortedTables[0].attributes?.seats || guestNumber < 1
            }
            type="number"
            inputProps={{
              max: sortedTables[0].attributes?.seats,
              min: 1,
              style: {
                textAlign: "center",
                color: "rgba(32, 56, 129, 1)",
              },
            }}
            value={guestNumber}
            onChange={handleChangeGuests}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleIncrement("remove")}
                  disabled={guestNumber <= 1}
                  sx={{ padding: "3px", color: "var(--main-title-color)" }}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleIncrement("add")}
                  disabled={guestNumber >= sortedTables[0].attributes?.seats}
                  sx={{ padding: "3px", color: "var(--main-title-color)" }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </>
    )
  );
}
