import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      disabled: "#d32f2f",
    },
    secondary: {
      main: "#d32f2f",
    },
    error: {
      main: "#d32f2f",
    },
    disabled: {
      main: "#d32f2f",
    },
  },
});

function Calendar() {
  const [value, setValue] = useState(new Date());
  const [highlightedDays] = useState([2, 15, 19, 23, 29]);
  const [notDisponibleDays] = useState([5, 6, 21, 26]);

  const disableDates = (date) => {
    return isWeekend(date);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: "24px" }}
        >
          <Avatar sx={{ bgcolor: "#00796b", marginRight: "8px" }}>C</Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Classe
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#d32f2f", marginRight: "8px" }}>C</Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Non disponible
          </Typography>
        </Box>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            shouldDisableDate={disableDates}
            renderDay={(date, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.includes(date.getDate());

              const isNotDisponible =
                !DayComponentProps.outsideCurrentMonth &&
                notDisponibleDays.includes(date.getDate());

              const color = isSelected
                ? "#00796b"
                : isNotDisponible
                ? "#d32f2f"
                : "white";

              return (
                <Badge
                  key={date.toString()}
                  overlap="circular"
                  badgeContent={isSelected ? "🔵" : undefined}
                >
                  <PickersDay
                    {...DayComponentProps}
                    sx={{
                      [`&&`]: {
                        backgroundColor: color,
                        color: (isSelected || isNotDisponible) && "white",
                      },
                    }}
                  />
                </Badge>
              );
            }}
            PaperProps={{
              sx: {
                "& .MuiPickersDay-root": {
                  backgroundColor: "#1976d2",
                },
              },
            }}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField color="success" {...params} />}
          />
        </ThemeProvider>
      </LocalizationProvider>
    </Box>
  );
}

export default Calendar;
