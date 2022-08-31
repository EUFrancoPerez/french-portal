import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../screens/Login";
import Dashboard from "../../screens/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
