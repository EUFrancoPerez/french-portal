import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { WEEK_DAYS } from "../../constants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CalendarCore({ nowDay, isThisWeek, week, appointments }) {
  const appointmentsOfThisWeek = appointments.filter((appointment) => {
    return appointment.date.startOf("week").isSame(week);
  });

  const isAnAppointmentOfThisDay = (dayOfWeek) =>
    appointmentsOfThisWeek.filter(
      (appointment) => appointment.dayOfWeek === dayOfWeek
    );

  return (
    <Grid container justifyContent="center" spacing={2} marginBottom="24px">
      {Object.values(WEEK_DAYS).map((weekDay, index) => (
        <Grid key={weekDay} item xs={1.5}>
          <Item
            sx={{
              marginBottom: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: index === nowDay && isThisWeek ? "#1976d2" : "",
              }}
            >
              <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
                {weekDay}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  flexGrow: 1,
                  color: index === nowDay && isThisWeek ? "30px" : "",
                }}
              >
                {week?.add(index, "day").get("date")}
              </Typography>
            </Box>
          </Item>
          {isAnAppointmentOfThisDay(index)?.length > 0 &&
            isAnAppointmentOfThisDay(index)?.map((appointment) => (
              <Item
                key={appointment.title}
                sx={{
                  background: "#1976d2",
                  marginBottom: "20px",
                  padding: "10px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{ flexGrow: 1, color: "#FFF" }}
                >
                  {appointment.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="h6"
                  sx={{ flexGrow: 1, color: "#FFF" }}
                >
                  {`${appointment.date.format("hh:mm")}-${appointment.date
                    .add(60, "minute")
                    .format("hh:mm")}`}
                </Typography>
              </Item>
            ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default CalendarCore;
