import AttendanceToggle from "../../AttendanceToggle";
import LogBook from "./LogBook/LogBook";
import StudentAttendances from "./StudentAttendances";
import StudentLeaveApplicationsList from "./StudentLeaveApplicationsList";
import TeacherRoutine from "./TeacherRoutine";

const TDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));

  return (
    <>
    <AttendanceToggle />
    <div className="d-flex flex-column gap-5">
      <TeacherRoutine />
      <LogBook />
      <StudentAttendances />
      {userInfo?.class_teacher_details && 
        <StudentLeaveApplicationsList />
      }
    </div>
    </>
  );
};

export default TDashboard;
