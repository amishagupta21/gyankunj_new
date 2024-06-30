import React, { useState, useMemo, useEffect } from "react";
import { viewStudentRoutine } from "../../ApiClient";
import CommonMatTable from "../../SharedComponents/CommonMatTable";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const PaRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [routineData, setRoutineData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentFilter, setStudentFilter] = useState({});

  useEffect(() => {
    if (userInfo.student_info && userInfo.student_info.length > 0) {
      setStudentFilter(userInfo.student_info[0]);
    }
  }, []);

  useEffect(() => {
    if (studentFilter.grade_id && studentFilter.section_id) {
      setIsLoading(true);
      viewStudentRoutine(studentFilter.grade_id, studentFilter.section_id)
        .then((res) => {
          setRoutineData([]);
          if (res?.data?.time_table && res?.data?.time_table.length > 0) {
            setRoutineData(res?.data?.time_table);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [studentFilter]);

  // Columns definition
  const columns = useMemo(
    () => [
      { accessorKey: "day", header: "Day" },
      { accessorKey: "period_id", header: "Period" },
      {
        header: "Time",
        accessorFn: (row) => (
          <div>
            {row.start_time} - {row.end_time}
          </div>
        ),
      },
      { accessorKey: "subject_name", header: "Subject" },
      { accessorKey: "teacher", header: "Teacher" },
    ],
    []
  );

  const handleStudentChange = (e) => {
    setStudentFilter(e.target.value);
  };

  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          justifyContent: "end",
        }}
      >
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel>Student</InputLabel>
          <Select
            label="Student"
            value={studentFilter}
            onChange={handleStudentChange}
            renderValue={(selected) => selected.student_name}
          >
            {userInfo.student_info.map((item) => (
              <MenuItem key={item.student_id} value={item}>
                {item.student_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <>
      {userInfo.student_info && userInfo.student_info.length > 1 && (
        <RenderTopToolbarCustomActions />
      )}
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={routineData || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Routine</h1>
        )}
      />
    </>
  );
};

export default PaRoutine;
