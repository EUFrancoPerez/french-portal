import * as React from "react";

import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const CustomPickersDay = styled(StaticDatePicker, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: "#1976d2",
    color: "#1976d2",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

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
  const [value, setValue] = React.useState(new Date());

  const disableDates = (date) => {
    return (
      isWeekend(date) ||
      (moment(date).format("DD") > 10 && moment(date).format("DD") < 18)
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CustomPickersDay
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={disableDates}
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
          renderInput={(params) => <TextField {...params} />}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default Calendar;
