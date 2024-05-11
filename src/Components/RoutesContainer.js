import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedWrapper } from "../ProtectedRoute";
import DashboardSectionContent from "./DashboardSectionContent";
import PageNotFound from "./PageNotFound";
import PDashboard from "./Principal Dashboard/PDashboard";
import AttendanceOverview from "./Principal Dashboard/AttendanceOverview";
import ReportSection from "./Principal Dashboard/Reports";
import Announcements from "./Principal Dashboard/Announcement/Announcement";
import Notifications from "./Principal Dashboard/Notifications";
import MySubjects from "./Teacher Dashboard/My Subject/MySubjects";
import TeacherReport from "./Teacher Dashboard/Teacher Report/TeacherReport";
import TeacherAttendance from "./Teacher Dashboard/TeacherAttendance/TeacherAttendance";
import TeacherAssignment from "./Teacher Dashboard/Assignment/TeacherAssignment";
import NoticeForTeacher from "./Teacher Dashboard/NoticeForTeacher/NoticeForTeacher";
import NotificationsForTeacher from "./Teacher Dashboard/NotificationsForTeacher/NotificationsForTeacher";
import StudentAssigments from "./Student Dashboard/Assignments/Assignments";
import StudentReportSection from "./Student Dashboard/Report/Reports";
import NoticeForStudents from "./Student Dashboard/NoticeForStudents/NoticeForStudents";
import NotificationsForStudent from "./Student Dashboard/Notification/StudentNotification";
import CreateAssignment from "./Teacher Dashboard/Assignment/CreateAssignment";
import Addquestions from "./Teacher Dashboard/Assignment/Addquestions";
import SubmissionsPage from "./Teacher Dashboard/Assignment/SubmissionsComponent";
import Viewreport from "./Teacher Dashboard/Assignment/Viewreport";
import EvaluteAssignmentReport from "./Teacher Dashboard/Assignment/EvaluteAssignmentReport";
import TDashboard from "./Teacher Dashboard/Dashboard/TDashboard";
import PLessonPlan from "./Principal Dashboard/PLessonPlan";
import LogBookCLassTeacher from "./Teacher Dashboard/Dashboard/LogBook/LogBookCLassTeacher";
import TLessonPlan from "./Teacher Dashboard/LessonPlan/TLessonPlan";
import PResources from "./Principal Dashboard/Resources/PResources";
import CustomMasterRoutine from "./Principal Dashboard/MasterRoutine/CustomMasterRoutine";
import TResources from "./Teacher Dashboard/Resources/TResources";
import SResources from "./Student Dashboard/Resources/SResources";
import SDashboard from "./Student Dashboard/SDashboard";

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
        {/* Principal Dashboard Routes */}
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
              element={<ProtectedWrapper Component={AttendanceOverview} />}
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
        {/* Student Dashboard Routes */}
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
  return <DashboardSectionContent />;
}
