import dayjs from "dayjs";
import React from "react";

const TeacherAttendanceV2 = ({ data }) => {
  // Extract the student data from the JSON
  const { student_attendance } = data;

  // Get all unique dates from the attendance records
  const allDates =
    student_attendance?.length > 0
      ? Array.from(
          new Set(
            student_attendance.flatMap((student) =>
              Object.keys(student.attendance)
            )
          )
        ).sort()
      : [];
  return (
    <div>
      {allDates && allDates.length > 0 ? (
        <table border="1">
          <thead>
            <tr style={{ background: "#bbfbf5" }}>
              <th style={{ minWidth: 80 }}>Roll No</th>
              <th style={{ minWidth: 150 }}>Name</th>
              <th style={{ width: 60 }}>%</th>
              {allDates?.map((date) => (
                <th style={{ width: 60 }} key={date}>
                  {dayjs(date).format("D")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {student_attendance?.map((student) => (
              <tr key={student.student_id}>
                <td>{student.roll_no}</td>
                <td>{student.name}</td>
                <td>{student.attendance_percentage}%</td>
                {allDates?.map((date) => (
                  <td
                    className={`text-center ${
                      student.attendance[date] === "Present"
                        ? "text-white bg-success"
                        : student.attendance[date] === "Absent"
                        ? "text-white bg-danger"
                        : "N/A"
                    }`}
                    key={date}
                  >
                    {student.attendance[date] === "Present"
                      ? "P"
                      : student.attendance[date] === "Absent"
                      ? "A"
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="py-5 text-center fs-4">
          Data not available
        </div>
      )}
    </div>
  );
};

export default TeacherAttendanceV2;
