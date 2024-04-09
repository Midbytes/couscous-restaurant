import React from "react";
import styles from "./reservationModal.module.scss";
import { Box, Button, Modal, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PHONE_REG_EXP } from "@/app/constants/phoneRegExp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import { useCreateReservationMutation } from "./createReservation.rq.generated";

export type Props = {
  openModal: boolean;
  onClose: () => void;
  guests: number;
  tableId: (string | null | undefined)[] | undefined;
  time: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0.5px solid #203881",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  boxSizing: "border-box",
};

const TextFieldStyles = {
  "& label.Mui-focused": {
    color: "#203881",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#203881",
  },
  "& .MuiInputLabel-root": {
    color: "#203881",
  },
};

const schema = yup
  .object({
    guestName: yup.string().required("Your name is required"),
    guestEmail: yup
      .string()
      .email("Please enter a valid email")
      .required("Your Email is required"),
    guestPhone: yup
      .string()
      .matches(PHONE_REG_EXP, "Please enter a valid number")
      .required("Your number is required"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function ReservationModal({
  openModal,
  onClose,
  guests,
  tableId,
  time,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync } = useCreateReservationMutation();
  const onSubmit = async (data: FormData) => {
    if (!guests || !tableId || !time) return;

    const result = await mutateAsync({
      reservationData: {
        ...data,
        guestsNumber: guests,
        reservationDate: time,
        //tables:tableId
      },
    });

    onClose();
  };

  return (
    <>
      <Modal open={openModal} onClose={onClose}>
        <Box sx={style}>
          <button className={styles.backBtn} onClick={onClose}>
            <KeyboardBackspaceIcon fontSize="medium" />
            Back
          </button>

          <div className={styles.container}>
            <h3>Confirm Reservation</h3>
            <span>{`${guests} guests, ${dayjs(time).format(
              "DD MMMM YYYY [at] H:mm"
            )}`}</span>
            <p>
              Please note that your table will be available for two hours, after
              which, it may be reserved by other guests.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.forms}>
              <TextField
                sx={TextFieldStyles}
                required
                label="Name"
                placeholder="Name"
                variant="standard"
                {...register("guestName")}
                error={Boolean(errors.guestName)}
                helperText={errors.guestName?.message}
              />
              <TextField
                sx={TextFieldStyles}
                required
                label="E-mail Address"
                type="e-mail"
                autoComplete="current-email"
                variant="standard"
                {...register("guestEmail")}
                error={Boolean(errors.guestEmail)}
                helperText={errors.guestEmail?.message}
              />
              <TextField
                sx={TextFieldStyles}
                required
                label="Phone Number"
                type="numeric"
                variant="standard"
                {...register("guestPhone")}
                error={Boolean(errors.guestPhone)}
                helperText={errors.guestPhone?.message}
              />
              <div className={styles.btn}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(32, 56, 129, 1)",
                    width: "70%",
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
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ReservationModal;
