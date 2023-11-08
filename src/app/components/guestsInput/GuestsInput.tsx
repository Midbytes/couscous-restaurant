import IconButton from "@mui/material/IconButton/IconButton";
import Input from "@mui/material/Input/Input";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { GetTablesQuery } from "../reservation/getTables.rq.generated";
import { Unpacked } from "@/app/type/utils";

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
      <Input
        error={
          guestNumber > sortedTables[0].attributes?.seats || guestNumber < 1
        }
        type="number"
        inputProps={{
          max: sortedTables[0].attributes?.seats,
          min: 1,
          style: { textAlign: "center" },
        }}
        value={guestNumber}
        onChange={handleChangeGuests}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              onClick={() => handleIncrement("remove")}
              disabled={guestNumber <= 1}
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleIncrement("add")}
              disabled={guestNumber >= sortedTables[0].attributes?.seats}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    )
  );
}
