import IconButton from "@mui/material/IconButton/IconButton";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import styles from "./guestInput.module.scss";

interface GuestsInputProps {
  guestNumber: number;
  onGuestNumberChange: (newGuestNumber: number) => void;
}

export default function GuestsInput({
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

  const maxSeats = 8;

  return (
    <>
      <div className={styles.input}>
        <TextField
          label="Guests"
          sx={(theme) => ({
            borderRadius: "4px",
            borderColor: theme.palette.primary.main,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          })}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
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
                  disabled={guestNumber >= maxSeats}
                  sx={{ padding: "3px", color: "var(--main-title-color)" }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={guestNumber > maxSeats || guestNumber < 1}
          type="number"
          inputProps={{
            max: maxSeats,
            min: 1,
            style: {
              textAlign: "center",
              color: "rgba(32, 56, 129, 1)",
            },
          }}
          value={guestNumber}
          onChange={handleChangeGuests}
        />
      </div>
    </>
  );
}
