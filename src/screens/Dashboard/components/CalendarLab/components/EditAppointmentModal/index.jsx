import React, { useState } from "react";
import dayjs from "dayjs";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";

const style = {
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

function EditAppointmentModal({
  isOpen,
  handleIsEditModalOpen,
  editAppointment,
  appointment,
  cancelAppointment,
}) {
  const handleClose = () => handleIsEditModalOpen(false);
  const [date, setDate] = useState(appointment ? appointment.date : dayjs());
  const [time, setTime] = useState(appointment ? appointment.date : dayjs());
  const [title, setTitle] = useState(appointment ? appointment.title : "");

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSaveAppointment = () => {
    handleIsEditModalOpen(false);
    editAppointment(title, date, time);
  };

  const handleCancelAppointment = () => {
    cancelAppointment(appointment.id);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        sx={{
          borderRadius: "4px",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                width: "44px",
                height: "44px ",
              }}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            sx={{ marginBottom: "24px" }}
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Éditer un nouveau rendez-vous
          </Typography>
          <TextField
            sx={{ marginBottom: "40px", width: "100%" }}
            id="standard-basic"
            label="Éditer un titre"
            variant="standard"
            onChange={handleSetTitle}
            value={title}
          />
          <Box sx={{ marginBottom: "24px", width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Éditer la date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    sx={{ marginBottom: "40px", width: "100%" }}
                    {...params}
                  />
                )}
              />
              <TimePicker
                label="Éditer l'heure"
                value={time}
                onChange={(newTimeValue) => {
                  setTime(newTimeValue);
                }}
                renderInput={(params) => (
                  <TextField sx={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
          >
            <Button
              color="error"
              onClick={handleCancelAppointment}
              sx={{
                marginRight: "24px",
                width: "105px",
              }}
              variant="outlined"
            >
              {" "}
              Annuler
            </Button>
            <Button
              onClick={handleSaveAppointment}
              disabled={title === ""}
              sx={{
                width: "105px",
              }}
              variant="contained"
            >
              Éditer
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default EditAppointmentModal;
