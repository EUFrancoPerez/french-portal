import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import WeekPicker from "./components/WeekPicker";
import CalendarCore from "./components/CalendarCore";
import AddAppointmentModal from "./components/AddAppointmentModal";
import EditAppointmentModal from "./components/EditAppointmentModal";

const now = dayjs();
const nowDay = now.get("day");

function CalendarLab() {
  const [id, setId] = useState(0);
  const [editableAppointment, setEditableAppointment] = useState();
  const [appointments, setAppointments] = useState([]);
  const [isAppointmentModalOpen, setIsModalAppointmentModal] = useState(false);
  const [isEditAppointmentModalOpen, setIsEditModalAppointmentModal] =
    useState(false);
  const [week, setWeek] = useState(now.startOf("week"));
  const isThisWeek = week.isSame(now.startOf("week"));

  const handleWeekChange = (newWeek) => setWeek(newWeek);
  const handleIsModalOpen = (value) => setIsModalAppointmentModal(value);
  const handleAddAppointmentButton = () => setIsModalAppointmentModal(true);
  const handleIsEditModalOpen = (value) =>
    setIsEditModalAppointmentModal(value);
  const handleEditAppointmentButton = (id) => {
    const appointmentToBeEdited = appointments.filter(
      (appointment) => appointment.id === id
    )[0];
    setEditableAppointment(appointmentToBeEdited);
    setIsEditModalAppointmentModal(true);
  };

  const addNewAppointment = (title, date, time) => {
    const newDateWithHour = dayjs(date).hour(time.get("hour"));
    const newDateWithMinutes = dayjs(newDateWithHour).minute(
      time.get("minute")
    );
    const tmpAppointments = [...appointments];

    const appointmentOverlaps = tmpAppointments.filter(
      (tmpAppointment) =>
        (newDateWithMinutes.isAfter(tmpAppointment.date) &&
          newDateWithMinutes.isBefore(tmpAppointment.date.add(60, "minute"))) ||
        (newDateWithMinutes.add(60, "minute").isAfter(tmpAppointment.date) &&
          newDateWithMinutes
            .add(60, "minute")
            .isBefore(tmpAppointment.date.add(60, "minute")))
    );
    if (appointmentOverlaps.length === 0) {
      tmpAppointments.push({
        id: id,
        title: title,
        date: newDateWithMinutes,
        dayOfWeek: date.get("day"),
      });
      setAppointments(tmpAppointments);
      setId(id + 1);
    }
  };

  const cancelAppointment = (appointmentId) => {
    const tmpAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(tmpAppointments);
  };

  const editAppointment = (index, title, date, time) => {
    console.log("Edit", title, date, time);
  };

  appointments.sort(function (a, b) {
    return dayjs(a.date).isBefore(b.date)
      ? -1
      : dayjs(a.date).isSame(b.date)
      ? 0
      : 1;
  });

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <WeekPicker handleWeekChange={handleWeekChange} />
      <CalendarCore
        isThisWeek={isThisWeek}
        nowDay={nowDay}
        week={week}
        appointments={appointments}
        handleEditAppointmentButton={handleEditAppointmentButton}
      />
      <Button
        onClick={handleAddAppointmentButton}
        sx={{
          position: "fixed",
          width: "120px",
          height: "50px",
          bottom: "40px",
          right: "40px",
        }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Créer
      </Button>
      <AddAppointmentModal
        isOpen={isAppointmentModalOpen}
        handleIsModalOpen={handleIsModalOpen}
        addNewAppointment={addNewAppointment}
      />
      {editableAppointment && isEditAppointmentModalOpen && (
        <EditAppointmentModal
          isOpen={isEditAppointmentModalOpen}
          handleIsEditModalOpen={handleIsEditModalOpen}
          editAppointment={editAppointment}
          appointment={editableAppointment}
          cancelAppointment={cancelAppointment}
        />
      )}
    </Box>
  );
}

export default CalendarLab;
