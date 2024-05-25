import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getGradeDetails, viewStudentAttendance } from "../../../ApiClient";

const TeacherAttendance = () => {
  const [gradeData, setGradeData] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [studentsAttendanceData, setStudentsAttendanceData] = useState({});
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [allDatesOfSelectedMonth, setAllDatesOfSelectedMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGradesList();
    getMonthsList();
  }, []);

  useEffect(() => {
    if (gradeFilter && sectionFilter && monthFilter) {
      setIsLoading(true);
      viewStudentAttendance(gradeFilter, sectionFilter, monthFilter)
        .then((res) => {
          setStudentsAttendanceData(res.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log("Attendance Error - ", err);
          setIsLoading(false);
        });
    }
  }, [gradeFilter, sectionFilter, monthFilter]);

  const getGradesList = () => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
  };

  const getMonthsList = () => {
    const monthList = Array.from({ length: 12 }, (v, i) => ({
      value: (i + 1).toString(),
      label: dayjs().month(i).format("MMMM"),
    }));
    setMonthsList(monthList);
  };

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
    setSectionFilter("");
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonthFilter(event.target.value);
    getDatesOfMonth(event.target.value);
  };

  const getDatesOfMonth = (month) => {
    const startOfMonth = dayjs(`${dayjs().year()}-${month}-01`).startOf(
      "month"
    );
    const endOfMonth = dayjs(`${dayjs().year()}-${month}-01`).endOf("month");
    const dates = [];
    let currentDate = startOfMonth;

    while (
      currentDate.isBefore(endOfMonth) ||
      currentDate.isSame(endOfMonth, "day")
    ) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    setAllDatesOfSelectedMonth(dates);
  };

  const formatDate = (date) => {
    const day = dayjs(date).date();
    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${suffix(day)}`;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <h4>Students Attendance</h4>
        {studentsAttendanceData.class_teacher && (
          <p>
            <strong>Class Teacher: </strong>
            <span>{studentsAttendanceData.class_teacher}</span>
          </p>
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="grade-filter-label">Grade</InputLabel>
          <Select
            labelId="grade-filter-label"
            value={gradeFilter || ""}
            onChange={handleGradeChange}
          >
            {gradeData.map((item) => (
              <MenuItem key={item.grade_id} value={item.grade_id}>
                {item.grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="section-filter-label">Section</InputLabel>
          <Select
            labelId="section-filter-label"
            value={sectionFilter}
            onChange={handleSectionChange}
            disabled={!gradeFilter}
          >
            {gradeData
              .find((grade) => grade.grade_id === gradeFilter)
              ?.section_list.map((section) => (
                <MenuItem key={section.section_id} value={section.section_id}>
                  {section.section_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="month-filter-label">Month</InputLabel>
          <Select
            labelId="month-filter-label"
            value={monthFilter}
            onChange={handleMonthChange}
          >
            {monthsList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className="overflow-auto shadow">
        {studentsAttendanceData?.student_attendance?.length > 0 ? (
          isLoading ? (
            <div className="text-center p-5">
              <CircularProgress />
            </div>
          ) : (
            <table border="1">
              <thead>
                <tr style={{ background: "#bbfbf5" }}>
                  <th style={{ minWidth: 80 }}>Roll No</th>
                  <th style={{ minWidth: 150 }}>Name</th>
                  <th style={{ width: 60 }}>%</th>
                  {allDatesOfSelectedMonth.map((date) => (
                    <th style={{ width: 60, padding: 10 }} key={date}>
                      {formatDate(date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentsAttendanceData?.student_attendance?.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.roll_no}</td>
                    <td>{student.name}</td>
                    <td>{student.attendance_percentage}%</td>
                    {allDatesOfSelectedMonth.map((date) => (
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
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div className="py-5 text-center fs-4">Data not available</div>
        )}
      </div>
    </>
  );
};

export default TeacherAttendance;
