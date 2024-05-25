import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getGradeDetails, viewAttendanceReport } from "../../../ApiClient";
import StudentAttendanceTable from "./StudentAttendanceTable";
import TeacherAttendanceTable from "./TeacherAttendanceTable";

const AttendancesOverview = () => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [classTeacher, setClassTeacher] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (gradeFilter && sectionFilter && activeTab) {
      setIsLoading(true);
      setClassTeacher("");
      setAttendanceData([]);
      viewAttendanceReport(gradeFilter, sectionFilter, activeTab)
        .then((res) => {
          if (activeTab === "student") {
            if (res.data.class_teacher_name) {
              setClassTeacher(res.data.class_teacher_name);
            }
            if (res?.data?.student_report?.attendance_data?.length > 0) {
              setAttendanceData(res.data.student_report.attendance_data);
            }
          } else {
            if (res?.data?.teacher_report?.attendance_data?.length > 0) {
              setAttendanceData(res.data.teacher_report.attendance_data);
            }
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [gradeFilter, sectionFilter, activeTab]);

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
    setSectionFilter("");
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <h4 className="mb-3" style={{ width: "calc(100%/3)" }}>
          Attendance Overview
        </h4>
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
      </Box>
      <div className="bg-secondary-subtle rounded mb-4">
        <Tabs
          variant="fullWidth"
          value={activeTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs for attendance"
        >
          <Tab
            value="teacher"
            className="rounded"
            sx={{
              width: "100%/2",
              bgcolor: activeTab === "teacher" ? "#c5ebff" : "inherit",
              color: activeTab === "teacher" ? "white" : "black",
            }}
            label="Teachers"
          />
          <Tab
            value="student"
            className="rounded"
            sx={{
              width: "100%/2",
              bgcolor: activeTab === "student" ? "#c5ebff" : "inherit",
              color: activeTab === "student" ? "white" : "black",
            }}
            label="Students"
          />
        </Tabs>
      </div>
      {activeTab === "student" ? (
        <StudentAttendanceTable data={attendanceData} isLoading={isLoading} />
      ) : (
        <TeacherAttendanceTable data={attendanceData} isLoading={isLoading} />
      )}
      {classTeacher && (
        <h1 className="fs-6 mt-2">
          Name of Class Teacher:{" "}
          <span className="fw-light">{classTeacher}</span>
        </h1>
      )}
    </>
  );
};

export default AttendancesOverview;
