import React, { useState, useEffect } from "react";
import {
  getGradeDetails,
  getMasterRoutineMetadataInfo,
  getViewMasterRoutineData,
} from "../../../ApiClient";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import CreateMasterRoutine from "./CreateMasterRoutine";

const CustomMasterRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [isLoading, setIsLoading] = useState(false);
  const [gradeData, setGradeData] = useState([]);
  const [masterRoutineData, setMasterRoutineData] = useState();
  const [selectedRoutineData, setSelectedRoutineData] = useState();
  const [selectedSectionData, setSelectedSectionData] = useState([]);
  const [isAddRoutineModalVisible, setIsAddRoutineModalVisible] =
    useState(false);
  const [periodData, setPeriodData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [dayFilter, setDayFilter] = useState();

  useEffect(() => {
    getMasterRoutineMetadata();
    getGradesList();
  }, []);

  useEffect(() => {
    if (dayFilter) getMasterRoutineData();
  }, [dayFilter]);

  const getMasterRoutineMetadata = () => {
    getMasterRoutineMetadataInfo(userInfo.routine_id)
      .then((res) => {
        if (res?.data && res.data.days && res.data.days.length > 0) {
          const currentDayName = dayjs().format("dddd").toLowerCase();
          const currentDayObject = res.data.days.find(
            (day) => day.day_name.toLowerCase() === currentDayName
          );
          setDaysData(res.data.days);
          setDayFilter(currentDayObject.day_id);
        }
        if (res?.data && res.data.periods && res.data.periods.length > 0) {
          const fourthPeriodIndex = res.data.periods.findIndex(
            (period) => period.period_id === 4
          );
          if (fourthPeriodIndex !== -1) {
            res.data.periods.splice(fourthPeriodIndex + 1, 0, {
              period_id: res.data.periods.length + 1,
              period: "Break",
            });
          }

          setPeriodData(res.data.periods);
        }
      })
      .catch((err) => console.error(err));
  };

  const getGradesList = () => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.error(err));
  };

  const getMasterRoutineData = () => {
    setIsLoading(true);
    getViewMasterRoutineData(dayFilter)
      .then((res) => {
        if (res?.data && Object.keys(res.data).length > 0) {
          setMasterRoutineData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleClickOpen = (data, sectionList = [], period) => {
    if (period !== "Break") {
      setSelectedRoutineData(data);
      setSelectedSectionData(sectionList);
      setIsAddRoutineModalVisible(true);
    }
  };

  const handleClose = (isSubmit) => {
    if (isSubmit) getMasterRoutineData();
    setIsAddRoutineModalVisible(false);
  };

  const FiltersView = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: 2,
      }}
    >
      <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
        <InputLabel id="day-filter-label">Day</InputLabel>
        <Select
          labelId="day-filter-label"
          value={dayFilter || ""}
          onChange={(e) => setDayFilter(e.target.value)}
        >
          {daysData.map((item) => (
            <MenuItem key={item.day_id} value={item.day_id}>
              {item.day_name}
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
              <th className="fs-6 bg-secondary">Grade</th>
              {periodData.map((item) => (
                <th
                  className={`fs-6 text-center ${
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
            {gradeData.map((gradeItem) => (
              <tr key={gradeItem.grade_id}>
                <td className="fw-bold" style={{ fontSize: 14 }}>
                  {gradeItem.grade}
                </td>
                {periodData.map((item) => {
                  const routine = masterRoutineData
                    ? masterRoutineData[item.period]
                    : null;
                  if (routine && routine.grade_id === gradeItem.grade_id) {
                    return (
                      <td className="p-0" key={item.period}>
                        <div
                          className="p-1 rounded text-center text-white cell selected-cell"
                          onClick={() =>
                            handleClickOpen(
                              routine,
                              gradeItem.section_list,
                              item.period
                            )
                          }
                        >
                          <p className="mb-0">
                            <small>
                              {routine.start_time}
                              {" - "}
                              {routine.end_time}
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
                          onClick={() =>
                            handleClickOpen(
                              {
                                grade_id: gradeItem.grade_id,
                                period_id: item.period_id,
                                day_id: dayFilter,
                              },
                              gradeItem.section_list,
                              item.period
                            )
                          }
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
      {isAddRoutineModalVisible && (
        <CreateMasterRoutine
          isOpen={isAddRoutineModalVisible}
          handleClose={handleClose}
          selectedData={selectedRoutineData}
          selectedSectionData={selectedSectionData}
        />
      )}
    </>
  );
};

export default CustomMasterRoutine;
