import React from "react";
import "./TeacherDashboard.css";
import TDashboard from "../Teacher Dashboard/Dashboard/Dashboard";
import MySubjects from "./My Subject/MySubjects";
import { Row, Col, Modal } from "react-bootstrap";
import { Router, Route, Routes } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import LogBook from "./LogBook/LogBook";

const TeacherDashboard = () => {
  return (
    <Routes>
      <Route path="/teacherDashboard/dashboard" Component={TDashboard} />
      <Route path="/teacherDashboard/subjects" Component={MySubjects} />
      <Route path="/teacherDashboard/logBook" Component={LogBook} />
      {/* <Route
              path="/principalDashboard/AttendanceOverview"
              Component={AttendanceOverview}
            />
            <Route
              path="/principalDashboard/Reports"
              Component={ReportSection}
            />
            <Route
              path="/principalDashboard/Resources"
              Component={Resources}
            />
            <Route
              path="/principalDashboard/Announcements"
              Component={Announcements}
            />
            <Route
              path="/principalDashboard/Notifications"
              Component={Notifications}
            /> */}
    </Routes>
  );
};

export default TeacherDashboard;
