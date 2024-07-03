import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import {
  getMasterRoutineMetadataInfo,
  viewStudentRoutine,
} from "../../ApiClient";
import BackButton from "../../SharedComponents/BackButton";

const PaRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [isLoading, setIsLoading] = useState(false);
  const [periodData, setPeriodData] = useState([]);
  const [routineData, setRoutineData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [studentFilter, setStudentFilter] = useState({});

  useEffect(() => {
    if (userInfo.student_info && userInfo.student_info.length > 0) {
      setStudentFilter(userInfo.student_info[0]);
    }
    getMasterRoutineMetadata();
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

  const getMasterRoutineMetadata = () => {
    getMasterRoutineMetadataInfo(userInfo.routine_id)
      .then((res) => {
        if (res?.data) {
          res.data["periods"] = [
            {
              period_id: 1,
              period: "1",
              start_time: "07:45:00",
              end_time: "08:25:00",
            },
            {
              period_id: 2,
              period: "2",
              start_time: "08:25:00",
              end_time: "09:05:00",
            },
            {
              period_id: 3,
              period: "3",
              start_time: "09:05:00",
              end_time: "09:45:00",
            },
            {
              period_id: 4,
              period: "4",
              start_time: "09:45:00",
              end_time: "10:25:00",
            },
            {
              period_id: 5,
              period: "5",
              start_time: "10:45:00",
              end_time: "11:25:00",
            },
            {
              period_id: 6,
              period: "6",
              start_time: "11:25:00",
              end_time: "12:05:00",
            },
            {
              period_id: 7,
              period: "7",
              start_time: "12:05:00",
              end_time: "12:45:00",
            },
            {
              period_id: 8,
              period: "8",
              start_time: "12:45:00",
              end_time: "13:25:00",
            },
          ];
          res.data["days"] = [
            {
              day_id: 1,
              day_name: "Monday",
            },
            {
              day_id: 2,
              day_name: "Tuesday",
            },
            {
              day_id: 3,
              day_name: "Wednesday",
            },
            {
              day_id: 4,
              day_name: "Thursday",
            },
            {
              day_id: 5,
              day_name: "Friday",
            },
            {
              day_id: 6,
              day_name: "Saturday",
            },
            {
              day_id: 7,
              day_name: "Sunday",
            },
          ];
          if (res.data.periods && res.data.periods.length > 0) {
            const updatedPeriodData = res.data.periods.reduce(
              (acc, period, index) => {
                acc.push(period);
                if (index === 3) {
                  acc.push({
                    period: "Break",
                    // Assuming other properties of period object need to be set
                    // If not, you can omit other properties
                    // For example: start_time: null, end_time: null, etc.
                  });
                }
                return acc;
              },
              []
            );

            setPeriodData(updatedPeriodData);
          }
          if (res.data.days && res.data.days.length > 0) {
            setDaysData(res.data.days);
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const handleStudentChange = (e) => {
    setStudentFilter(e.target.value);
  };

  const FiltersView = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginBottom: 2,
        justifyContent: "space-between",
      }}
    >
      <BackButton />
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

  return (
    <>
      <FiltersView />
      {isLoading ? (
        <div className="text-center mt-5">
          <CircularProgress />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="fs-6 bg-secondary text-white">Day</th>
              {periodData.map((item) => (
                <th
                  className={`fs-6 text-center text-white ${
                    item.period === "Break" ? "bg-danger" : "bg-secondary"
                  }`}
                  key={item.period}
                >
                  {item.period !== "Break" ? "Period" : ""} {item.period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysData &&
              daysData.length > 0 &&
              daysData.map((dayItem) => (
                <tr key={dayItem.day_id}>
                  <td className="fw-bold" style={{ fontSize: 14 }}>
                    {dayItem.day_name}
                  </td>
                  {periodData.map((item) => {
                    const routine = routineData.find(
                      (r) => r.period_id === item.period_id
                    );
                    if (routine) {
                      return (
                        <td className="p-0" key={item.period}>
                          <div className="p-1 rounded text-center text-white cell selected-cell">
                            <p className="mb-0">
                              <small>
                                {routine.start_time} - {routine.end_time}
                              </small>
                            </p>
                            <p className="mb-0">
                              <small>{routine.subject_name}</small>
                            </p>
                            <p className="mb-0">
                              <small>{routine.teacher_name}</small>
                            </p>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td className="p-0" key={item.period}>
                          <div
                            className={`text-center cell ${
                              item.period !== "Break" ? "empty-cell" : ""
                            }`}
                          ></div>
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PaRoutine;
