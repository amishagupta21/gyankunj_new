import LogBook from "./LogBook";
import StudentAttendances from "./StudentAttendances";

const TDashboard = () => {
  return (
    <div className="d-flex flex-column gap-5 py-5 px-4">
      <LogBook /><StudentAttendances />
    </div>
  );
};

export default TDashboard;
