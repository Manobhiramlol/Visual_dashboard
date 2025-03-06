import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import Login from "./components/Login/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
