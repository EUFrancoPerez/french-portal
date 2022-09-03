import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import WeekPicker from "./components/WeekPicker";
import CalendarCore from "./components/CalendarCore";
import AddAppointmentModal from "./components/AddAppointmentModal";

const now = dayjs();
const nowDay = now.get("day");

function CalendarLab() {
  const [appointments, setAppointments] = useState([]);
  const [isAppointmentModalOpen, setIsModalAppointmentModal] = useState(false);
  const [week, setWeek] = useState(now.startOf("week"));
  const isThisWeek = week.isSame(now.startOf("week"));

  const handleWeekChange = (newWeek) => setWeek(newWeek);
  const handleIsModalOpen = (value) => setIsModalAppointmentModal(value);
  const handleAddAppointmentButton = () => setIsModalAppointmentModal(true);
  const addNewAppointment = (title, date, time) => {
    const newDateWithHour = dayjs(date).hour(time.get("hour"));
    const newDateWithMinutes = dayjs(newDateWithHour).minute(
      time.get("minute")
    );
    const tmpAppointments = [...appointments];
    tmpAppointments.push({
      title: title,
      date: newDateWithMinutes,
      dayOfWeek: date.get("day"),
    });
    setAppointments(tmpAppointments);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <WeekPicker handleWeekChange={handleWeekChange} />
      <CalendarCore
        isThisWeek={isThisWeek}
        nowDay={nowDay}
        week={week}
        appointments={appointments}
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
    </Box>
  );
}

export default CalendarLab;
