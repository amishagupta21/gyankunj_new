import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedWrapper } from "../ProtectedRoute";
import DashboardSectionContent from "../Components/DashboardSectionContent";
import PageNotFound from "./PageNotFound";
import PDashboard from "../Components/Principal Dashboard/Dashboard";
import MasterRoutine from "../Components/Principal Dashboard/MasterRoutine/MasterRoutine";
import LessonPlan from "../Components/Principal Dashboard/Lesson Plan/LessonPlan";
import AttendanceOverview from "../Components/Principal Dashboard/Attendance/AttendanceOverview";
import ReportSection from "../Components/Principal Dashboard/Reports/Reports";
import Resources from "../Components/Principal Dashboard/Resources/ResourcesList";
import Announcements from "../Components/Principal Dashboard/Announcement/Announcement";
import Notifications from "../Components/Principal Dashboard/Notifications/Notifications";
// import TDashboard from "../Components/Teacher Dashboard/Dashboard/Dashboard";
import MySubjects from "../Components/Teacher Dashboard/My Subject/MySubjects";
import TLessonPlan from "../Components/Teacher Dashboard/LessonPlan/LessonPlan";
import LogBook from "../Components/Teacher Dashboard/LogBook/LogBook";
import TeacherReport from "../Components/Teacher Dashboard/Teacher Report/TeacherReport";
import TeacherAttendance from "../Components/Teacher Dashboard/TeacherAttendance/TeacherAttendance";
import TeacherAssignment from "../Components/Teacher Dashboard/Assignment/TeacherAssignment";
import ResourcesForTeacher from "../Components/Teacher Dashboard/ResourcesForTeacher/ResourcesForTeacher";
import NoticeForTeacher from "../Components/Teacher Dashboard/NoticeForTeacher/NoticeForTeacher";
import NotificationsForTeacher from "../Components/Teacher Dashboard/NotificationsForTeacher/NotificationsForTeacher";
import StudentAssigments from "../Components/Student Dashboard/Assignments/Assignments";
import StudentDashboard from "../Components/Student Dashboard/StudentDashboard";
import StudentReportSection from "../Components/Student Dashboard/Report/Reports";
import ResourcesForStudents from "../Components/Student Dashboard/Resources/StudentResources";
import NoticeForStudents from "../Components/Student Dashboard/NoticeForStudents/NoticeForStudents";
import NotificationsForStudent from "../Components/Student Dashboard/Notification/StudentNotification";
import CreateAssignment from '../Components/Teacher Dashboard/Assignment/CreateAssignment';
import Addquestions from '../Components/Teacher Dashboard/Assignment/Addquestions';
import SubmissionsPage from '../Components/Teacher Dashboard/Assignment/SubmissionsComponent';
import Viewreport from '../Components/Teacher Dashboard/Assignment/Viewreport';
import EvaluteAssignmentReport from '../Components/Teacher Dashboard/Assignment/EvaluteAssignmentReport';
import TDashboard from "./Teacher Dashboard/Dashboard/TDashboard";

// Define routes for different user roles
const roleRoutes = {
  ADMIN: "/principalDashboard/dashboard",
  PRINCIPAL: "/principalDashboard/dashboard",
  TEACHER: "/teacherDashboard/dashboard",
  STUDENT: "/studentDashboard/dashboard",
};

export default function RoutesContainer({ userData }) {
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
        {/* Principal Dashboard Routes */}
        {userData.role === "ADMIN" || userData.role === "PRINCIPAL" ? (
          <>
            <Route
              path="/principalDashboard/dashboard"
              element={<ProtectedWrapper Component={PDashboard} />}
            />
            <Route
              path="/principalDashboard/masterRoutine"
              element={<ProtectedWrapper Component={MasterRoutine} />}
            />
            <Route
              path="/principalDashboard/lessonPlan"
              element={<ProtectedWrapper Component={LessonPlan} />}
            />
            <Route
              path="/principalDashboard/attendanceOverview"
              element={<ProtectedWrapper Component={AttendanceOverview} />}
            />
            <Route
              path="/principalDashboard/reports"
              element={<ProtectedWrapper Component={ReportSection} />}
            />
            <Route
              path="/principalDashboard/resources"
              element={<ProtectedWrapper Component={Resources} />}
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
        {/* Teacher Dashboard Routes */}
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
            <Route
              path="/teacherDashboard/logBook"
              element={<ProtectedWrapper Component={LogBook} />}
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
              element={<ProtectedWrapper Component={ResourcesForTeacher} />}
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
        {/* Student Dashboard Routes */}
        {userData.role === "STUDENT" ? (
          <>
            <Route
              path="/studentDashboard/dashboard"
              element={<ProtectedWrapper Component={StudentDashboard} />}
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
              element={<ProtectedWrapper Component={ResourcesForStudents} />}
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
  return <DashboardSectionContent />;
}
