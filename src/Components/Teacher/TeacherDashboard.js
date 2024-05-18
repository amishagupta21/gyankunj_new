import React from "react";
import "./TeacherDashboard.css";
import TDashboard from "./Dashboard/Dashboard";
import MySubjects from "./My Subject/MySubjects";
import { Route, Routes } from "react-router-dom";
import LogBook from "./LogBook/LogBook";

const TeacherDashboard = () => {
  return (
    <Routes>
      <Route path="/teacherDashboard/dashboard" Component={TDashboard} />
      <Route path="/teacherDashboard/subjects" Component={MySubjects} />
      <Route path="/teacherDashboard/logBook" Component={LogBook} />
    </Routes>
  );
};

export default TeacherDashboard;
