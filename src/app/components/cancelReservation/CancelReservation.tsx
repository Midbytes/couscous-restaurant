"use client";
import Button from "@mui/material/Button/Button";
import React, { useState } from "react";
import { deleteReservationMutation } from "./deleteReservation.rq.generated";
import { useGetReservationQuery } from "./getReservation.rq.generated";

export default function CancelReservation({ id }: { id: string }) {
  const [deletedReservation, setDeletedReservation] = useState(false);

  const { data } = useGetReservationQuery({ id });

  const handleDelete = async () => {
    await deleteReservationMutation({ id });
    setDeletedReservation(true);
  };
  if (data?.reservation && !data.reservation.data)
    return (
      <section className="container">
        <h1>This reservation has already been cancelled</h1>
      </section>
    );
  if (deletedReservation)
    return (
      <section className="container">
        <h1>Your reservation has been cancelled</h1>
      </section>
    );
  return (
    <section className="container">
      <h1>Are you sure you want to cancel your reservation #{id}?</h1>
      <p>Reservation for {data?.reservation?.data?.attributes?.guestName}</p>
      <Button variant="contained" onClick={() => handleDelete()}>
        Cancel Reservation
      </Button>
    </section>
  );
}
