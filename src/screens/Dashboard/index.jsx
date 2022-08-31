import React, { useState } from "react";

import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Students from "./components/Students";
import Documents from "./components/Documents";
import Calendar from "./components/Calendar";
import Forum from "./components/Forum";

import { TAB_OPTIONS } from "./constants";

import "./styles.css";

const TAB_OPTION_COMPONENT = {
  [TAB_OPTIONS.CALENDAR]: <Calendar />,
  [TAB_OPTIONS.FORUM]: <Forum />,
  [TAB_OPTIONS.DOCUMENTS]: <Documents />,
  [TAB_OPTIONS.STUDENTS]: <Students />,
};

function Dashboard() {
  const [tab, setTab] = useState(TAB_OPTIONS.CALENDAR);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body-container">
        <Tabs tab={tab} setTab={(value) => setTab(value)} />
        <div className="section-container">{TAB_OPTION_COMPONENT[tab]}</div>
      </div>
    </div>
  );
}

export default Dashboard;
