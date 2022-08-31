import * as React from "react";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    color: "#d32f2f !important",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#d32f2f !important",
  },
  "& .Mui-selected": {
    color: "#d32f2f !important",
  },
});

function PageTabs({ tab, setTab }) {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <StyledTabs
        value={tab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="calendar" label="Calendrier" />
        <Tab value="forum" label="Forum" />
        <Tab value="students" label="Étudiants" />
        <Tab value="documents" label="Documents" />
      </StyledTabs>
    </Box>
  );
}

export default PageTabs;
