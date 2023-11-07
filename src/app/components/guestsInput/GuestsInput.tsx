import IconButton from "@mui/material/IconButton/IconButton";
import Input from "@mui/material/Input/Input";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { GetTablesQuery } from "../reservation/getTables.rq.generated";
import { Unpacked } from "@/app/type/utils";

type SortedTables = Unpacked<NonNullable<GetTablesQuery["tables"]>>["data"];

interface GuestsInputProps {
  sortedTables: SortedTables;
}

export default function GuestsInput({ sortedTables }: GuestsInputProps) {
  const [guestNumber, setGestsNumber] = useState(1);

  const handleChangeGuests = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGestsNumber(e.target.valueAsNumber);

  const handleIncrement = (type: "remove" | "add") => {
    if (!guestNumber) setGestsNumber(1);
    else setGestsNumber((prev) => (type === "remove" ? prev - 1 : prev + 1));
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
