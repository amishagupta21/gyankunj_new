import AttendanceToggle from "../../AttendanceToggle";
import LogBook from "./LogBook/LogBook";
import StudentAttendances from "./StudentAttendances";
import TeacherRoutine from "./TeacherRoutine";

const TDashboard = () => {
  return (
    <>
    <AttendanceToggle />
    <div className="d-flex flex-column gap-5">
      <TeacherRoutine />
      <LogBook />
      <StudentAttendances />
    </div>
    </>
  );
};

export default TDashboard;
