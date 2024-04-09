import React, { useState, useMemo, useEffect, useCallback } from "react";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getGradeDetails, getStudentAttendances, saveAttendance } from "../../../ApiClient";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { showAlertMessage } from "../../AlertMessage";

const StudentAttendances = () => {
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [selectedDressDefaulters, setSelectedDressDefaulters] = useState([]);
  const [selectedAbsentees, setSelectedAbsentees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.error("Error fetching grade details: ", err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getStudentAttendances(gradeFilter, sectionFilter, dayjs().format("YYYY-MM-DD"))
      .then((res) => {
        setStudentAttendances([]);
        if (
          res?.data?.student_attendance_data &&
          res?.data?.student_attendance_data.length
        ) {
          setStudentAttendances(res.data.student_attendance_data);
          const defaulters = [];
          const absentees = [];
          res.data.student_attendance_data.map((item) => {
            if(item.is_absent){
              absentees.push(item.student_id);
            }
            if(item.is_dress_defaulted){
              defaulters.push(item.student_id);
            }
          })
          setSelectedDressDefaulters(defaulters);
          setSelectedAbsentees(absentees);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student attendances: ", err);
        setIsLoading(false);
      });
  }, [gradeFilter, sectionFilter]);

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
    setSectionFilter(""); // Reset section filter when grade changes
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleDressDefaulterChange = useCallback((isChecked, rowData) => {
    setSelectedDressDefaulters((prevDefaulters) => {
      if (isChecked) {
        return [...prevDefaulters, rowData.student_id];
      } else {
        return prevDefaulters.filter((id) => id !== rowData.student_id);
      }
    });
  }, []);

  const handleAbsenteesChange = useCallback((isChecked, rowData) => {
    setSelectedAbsentees((prevAbsentees) => {
      if (isChecked) {
        setSelectedDressDefaulters((prevDefaulters) => {
          const filteredDefaulters = prevDefaulters.filter(
            (id) => id !== rowData.student_id
          );
          return filteredDefaulters;
        });
        return [...prevAbsentees, rowData.student_id];
      } else {
        return prevAbsentees.filter((id) => id !== rowData.student_id);
      }
    });
    setIsTableVisible(false);
    setTimeout(() => {
      setIsTableVisible(true)
    });
  }, []);
  

  const handleAttendanceSubmit = () => {
    const payload = {
      "grade_id": gradeFilter,
      "section_id": sectionFilter,
      "absentees":selectedAbsentees,
      "dress_defaulters": selectedDressDefaulters,
      "date": dayjs().format("YYYY-MM-DD")
  }
    saveAttendance(payload).then((res) => {
      if (res?.data?.status === "success") {
        setShowAlert("success");
      } else {
        setShowAlert("error");
      }

      setTimeout(() => {
        setShowAlert("");
      }, 3000);
    })
    .catch((err) => {
      setShowAlert("error");
      setTimeout(() => {
        setShowAlert("");
      }, 3000);
    });
  }

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
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
                {item.grade_id}
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
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}><Button variant="contained" sx={{width:100, height: 56}} onClick={handleAttendanceSubmit}>Submit</Button></FormControl>
      </Box>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        header: "Roll No.",
        accessorKey: "roll_no",
      },
      {
        header: "Student Name",
        accessorKey: "student_name",
      },
      {
        header: "Absentees",
        accessorFn: (row) => (
          <Switch
            defaultChecked={selectedAbsentees.includes(row.student_id)}
            onChange={(event) =>
              handleAbsenteesChange(event.target.checked, row)
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        ),
      },
      {
        header: "Dress Defaulter",
        accessorFn: (row) => (
          <Switch
           disabled={selectedAbsentees.includes(row.student_id)}
            defaultChecked={selectedDressDefaulters.includes(row.student_id)}
            onChange={(event) =>
              handleDressDefaulterChange(event.target.checked, row)
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        ),
      },
    ],
    [handleDressDefaulterChange, handleAbsenteesChange, selectedAbsentees, selectedDressDefaulters]
  );

  return (
    <div>
      <RenderTopToolbarCustomActions />
      {isTableVisible && <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={studentAttendances || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Student's attendance</h1>
        )}
      />}
      {!isTableVisible && <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={studentAttendances || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Student's attendance</h1>
        )}
      />}
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `${
            showAlert === "success" ? "Attendance successfully marked" : "Attendance marking failed"
          }.`,
        })}
    </div>
  );
};

export default StudentAttendances;
