import React from "react";
import "./PrincipalDashboard.css";
import PrincipalSidebar from "./PrincipalSidebar";
import { Router, Route, Routes, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import MasterRoutine from "./MasterRoutine/MasterRoutine";
import AttendanceOverview from "./Attendance/AttendanceOverview";
import ReportSection from "./Reports/Reports";
import LessonPlan from "./Lesson Plan/LessonPlan";
import Resources from "./Resources/ResourcesList";
import Notifications from "./Notifications/Notifications";
import { Row, Col, Modal } from "react-bootstrap";
import Announcements from "./Announcement/Announcement";

const PrincipalDashboard = () => {
  return (
    <Router>
      <Route path="/principalDashboard/dashboard" Component={Dashboard} />
      <Route
        path="/principalDashboard/masterRoutine"
        component={MasterRoutine}
      />
      <Route path="/principalDashboard/lessonPlan" component={LessonPlan} />
      <Route
        path="/principalDashboard/attendanceOverview"
        component={AttendanceOverview}
      />
      <Route path="/principalDashboard/reports" component={ReportSection} />
      <Route path="/principalDashboard/resources" component={Resources} />
      <Route
        path="/principalDashboard/announcements"
        component={Announcements}
      />
      <Route
        path="/principalDashboard/notifications"
        component={Notifications}
      />
    </Router>
  );
};

export default PrincipalDashboard;
