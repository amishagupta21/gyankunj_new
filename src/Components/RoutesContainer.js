import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedWrapper } from "../ProtectedRoute";
import LandingDashboard from "./LandingDashboard";
import PageNotFound from "./PageNotFound";
import PDashboard from "./Principal/PDashboard";
import ReportSection from "./Principal/Reports";
import Announcements from "./Principal/Announcement/Announcement";
import Notifications from "./Principal/Notifications";
import MySubjects from "./Teacher/MySubject/MySubjects";
import TeacherReport from "./Teacher/TeacherReport/TeacherReport";
import TeacherAssignment from "./Teacher/Assignment/TeacherAssignment";
import NoticeForTeacher from "./Teacher/NoticeForTeacher/NoticeForTeacher";
import NotificationsForTeacher from "./Teacher/NotificationsForTeacher/NotificationsForTeacher";
import StudentAssigments from "./Student/Assignments/Assignments";
import StudentReportSection from "./Student/Report/Reports";
import NoticeForStudents from "./Student/NoticeForStudents/NoticeForStudents";
import NotificationsForStudent from "./Student/Notification/StudentNotification";
import CreateAssignment from "./Teacher/Assignment/CreateAssignment";
import Addquestions from "./Teacher/Assignment/Addquestions";
import SubmissionsPage from "./Teacher/Assignment/SubmissionsComponent";
import Viewreport from "./Teacher/Assignment/Viewreport";
import EvaluteAssignmentReport from "./Teacher/Assignment/EvaluteAssignmentReport";
import TDashboard from "./Teacher/Dashboard/TDashboard";
import PLessonPlan from "./Principal/PLessonPlan";
import LogBookCLassTeacher from "./Teacher/Dashboard/LogBook/LogBookCLassTeacher";
import TLessonPlan from "./Teacher/LessonPlan/TLessonPlan";
import PResources from "./Principal/Resources/PResources";
import CustomMasterRoutine from "./Principal/MasterRoutine/CustomMasterRoutine";
import TResources from "./Teacher/Resources/TResources";
import SResources from "./Student/Resources/SResources";
import SDashboard from "./Student/SDashboard";
import TeacherAttendance from "./Teacher/TeacherAttendance/TeacherAttendance";
import AttendancesOverview from "./Principal/Attendance/AttendancesOverview";

// Define routes for different user roles
const roleRoutes = {
  ADMIN: "/principalDashboard/dashboard",
  PRINCIPAL: "/principalDashboard/dashboard",
  TEACHER: "/teacherDashboard/dashboard",
  STUDENT: "/studentDashboard/dashboard",
};

export default function RoutesContainer({ userData }) {
  const classTeacherDetails = userData?.class_teacher_details;
  // Function to check if the user has the required role for accessing a route
  const hasPermission = (allowedRoles) => {
    return allowedRoles.includes(userData?.role);
  };

  // Redirect users based on their role
  if (!userData) {
    return <Navigate to="/" />;
  } else if (hasPermission(["ADMIN", "PRINCIPAL", "TEACHER", "STUDENT"])) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={roleRoutes[userData.role]} />} />
        {/* Principal Routes */}
        {userData.role === "ADMIN" || userData.role === "PRINCIPAL" ? (
          <>
            <Route
              path="/principalDashboard/dashboard"
              element={<ProtectedWrapper Component={PDashboard} />}
            />
            <Route
              path="/principalDashboard/masterRoutine"
              element={<ProtectedWrapper Component={CustomMasterRoutine} />}
            />
            <Route
              path="/principalDashboard/lessonPlan"
              element={<ProtectedWrapper Component={PLessonPlan} />}
            />
            <Route
              path="/principalDashboard/attendanceOverview"
              element={<ProtectedWrapper Component={AttendancesOverview} />}
            />
            <Route
              path="/principalDashboard/reports"
              element={<ProtectedWrapper Component={ReportSection} />}
            />
             <Route
              path="/principalDashboard/resources"
              element={<ProtectedWrapper Component={PResources} />}
            />
            <Route
              path="/principalDashboard/announcements"
              element={<ProtectedWrapper Component={Announcements} />}
            />
            <Route
              path="/principalDashboard/notifications"
              element={<ProtectedWrapper Component={Notifications} />}
            />
          </>
        ) : null}
        {/* Teacher Routes */}
        {userData.role === "TEACHER" ? (
          <>
            <Route
              path="/teacherDashboard/dashboard"
              element={<ProtectedWrapper Component={TDashboard} />}
            />
            <Route
              path="/teacherDashboard/subjects"
              element={<ProtectedWrapper Component={MySubjects} />}
            />
            {/* {classTeacherDetails && (
              <Route
                path="/teacherDashboard/logBook"
                element={<ProtectedWrapper Component={LogBookCLassTeacher} />}
              />
            )} */}
             <Route
                path="/teacherDashboard/logBook"
                element={<ProtectedWrapper Component={LogBookCLassTeacher} />}
              />
            <Route
              path="/teacherDashboard/lessonPlan"
              element={<ProtectedWrapper Component={TLessonPlan} />}
            />
            <Route
              path="/teacherDashboard/reports"
              element={<ProtectedWrapper Component={TeacherReport} />}
            />
            <Route
              path="/teacherDashboard/attendance"
              element={<ProtectedWrapper Component={TeacherAttendance} />}
            />
            <Route
              path="/teacherDashboard/assignments"
              element={<ProtectedWrapper Component={TeacherAssignment} />}
            />
            <Route
              path="/teacherDashboard/resources"
              element={<ProtectedWrapper Component={TResources} />}
            />
            <Route
              path="/teacherDashboard/announcements"
              element={<ProtectedWrapper Component={NoticeForTeacher} />}
            />
            <Route
              path="/teacherDashboard/notifications"
              element={<ProtectedWrapper Component={NotificationsForTeacher} />}
            />
            <Route
              path="/teacherDashboard/createAssignment"
              element={<ProtectedWrapper Component={CreateAssignment} />}
            />
            <Route
              path="/teacherDashboard/addquestions"
              element={<ProtectedWrapper Component={Addquestions} />}
            />
            <Route
              path="/teacherDashboard/submissions/:assignmentId"
              element={<ProtectedWrapper Component={SubmissionsPage} />}
            />
            <Route
              path="/teacherDashboard/submissionsReport/:assignmentId"
              element={<ProtectedWrapper Component={Viewreport} />}
            />
            <Route
              path="/teacherDashboard/evaluteAssignment/:assignmentId/:studentId"
              element={<ProtectedWrapper Component={EvaluteAssignmentReport} />}
            />
          </>
        ) : null}
        {/* Student Routes */}
        {userData.role === "STUDENT" ? (
          <>
            <Route
              path="/studentDashboard/dashboard"
              element={<ProtectedWrapper Component={SDashboard} />}
            />
            <Route
              path="/studentDashboard/reports"
              element={<ProtectedWrapper Component={StudentReportSection} />}
            />
            <Route
              path="/studentDashboard/assignments"
              element={<ProtectedWrapper Component={StudentAssigments} />}
            />
            <Route
              path="/studentDashboard/resources"
              element={<ProtectedWrapper Component={SResources} />}
            />
            <Route
              path="/studentDashboard/notice"
              element={<ProtectedWrapper Component={NoticeForStudents} />}
            />
            <Route
              path="/studentDashboard/notifications"
              element={<ProtectedWrapper Component={NotificationsForStudent} />}
            />
          </>
        ) : null}
        {/* 404 Route */}
        <Route
          path="/404"
          element={<ProtectedWrapper Component={PageNotFound} />}
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    );
  }

  // If user doesn't have permission, show DashboardSectionContent
  return <LandingDashboard />;
}
