import React, { useState, useEffect } from "react";
import {
  getGradeDetails,
  getMasterRoutineMetadataInfo,
  getSubjectsList,
  getTeachersData,
  getViewMasterRoutineData,
  updateMasterRoutineType,
} from "../../../ApiClient";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import CreateMasterRoutine from "./CreateMasterRoutine";
import { showAlertMessage } from "../../AlertMessage";
import CreateMasterSchedule from "./CreateMasterSchedule";

const CustomMasterRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [isLoading, setIsLoading] = useState(false);
  const [gradeData, setGradeData] = useState([]);
  const [masterRoutineData, setMasterRoutineData] = useState({});
  const [selectedRoutineData, setSelectedRoutineData] = useState(null);
  const [selectedSectionData, setSelectedSectionData] = useState([]);
  const [isAddRoutineModalVisible, setIsAddRoutineModalVisible] = useState(false);
  const [isAddScheduleModalVisible, setIsAddScheduleModalVisible] = useState(false);
  const [periodData, setPeriodData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [dayFilter, setDayFilter] = useState("");
  const [routineTypeFilter, setRoutineTypeFilter] = useState();
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    getMasterRoutineMetadata();
    getAllSubjectsData();
    getAllTeachersData();
    getGradesList();
    setRoutineTypeFilter(userInfo.routine_id??1);
  }, []);

  useEffect(() => {
    if (dayFilter) getMasterRoutineData();
  }, [dayFilter]);

  const getMasterRoutineMetadata = () => {
    getMasterRoutineMetadataInfo(userInfo.routine_id)
      .then((res) => {
        if (res?.data) {
          const currentDayName = dayjs().format("dddd").toLowerCase();
          const currentDayObject = res.data.days?.find(
            (day) => day.day_name.toLowerCase() === currentDayName
          );
          if (currentDayObject) setDayFilter(currentDayObject.day_id);

          const updatedPeriodData = res.data.periods?.reduce(
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
          setDaysData(res.data.days);
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

  const getAllSubjectsData = () => {
    getSubjectsList()
      .then((res) => {
        setSubjectsList([]);
        if (res.data && res.data.subjects && res.data.subjects.length > 0) {
          setSubjectsList(res.data.subjects);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTeachersData = () => {
    getTeachersData()
      .then((res) => {
        if (res.data && res.data.teachers && res.data.teachers.length > 0) {
          setTeacherData(res.data.teachers);
        }
      })
      .catch((err) => console.log("Teachers err - ", err));
  };

  const getMasterRoutineData = () => {
    setIsLoading(true);
    getViewMasterRoutineData(dayFilter)
      .then((res) => {
        if (res?.data) {
          setMasterRoutineData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleClickOpen = (data, sectionList = [], period) => {
    if (period !== "Break" && data) {
      setSelectedRoutineData(data);
      setSelectedSectionData(sectionList);
      setIsAddRoutineModalVisible(true);
    }
  };

  const handleClose = (isSubmit) => {
    if (isSubmit) getMasterRoutineData();
    setIsAddRoutineModalVisible(false);
  };
  
  const handleCloseForRoutine = (isSubmit) => {
    setIsAddScheduleModalVisible(false);
    getMasterRoutineMetadata();
    getMasterRoutineData();
  };

  const handleRoutineTypeChange = (e) => {
    setRoutineTypeFilter(e.target.checked?2: 1);
    const payload = {
      "routine_id": e.target.checked?2: 1
  }
    updateMasterRoutineType(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          setShowAlert("");
          userInfo.routine_id = payload.routine_id;
          userInfo.routine_type = payload.routine_id === 1 ? 'summer': 'winter';
          localStorage.setItem("UserData", JSON.stringify(userInfo));
          setIsAddScheduleModalVisible(true);
        }, 1000);
      })
      .catch((err) => {
        setShowAlert("error");
        setTimeout(() => {
          setShowAlert("");
        }, 3000);
      });

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
        <InputLabel>Day</InputLabel>
        <Select
          label="Day"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
        >
          {daysData.map((item) => (
            <MenuItem key={item.day_id} value={item.day_id}>
              {item.day_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormControlLabel
          className="justify-content-end m-0"
          control={
            <>
              <label className={`${routineTypeFilter === 1 ? 'fw-bold text-primary-emphasis':''}`}>Summer</label>
              <Switch
                checked={routineTypeFilter === 2?true:false}
                onChange={handleRoutineTypeChange}
              />
              <label className={`${routineTypeFilter === 2 ? 'fw-bold text-primary-emphasis':''}`}>Winter</label>
            </>
          }
        />
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
              <th className="fs-6 bg-secondary text-white">Grade</th>
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
            {gradeData &&
              gradeData.length > 0 &&
              gradeData.map((gradeItem) => (
                <tr key={gradeItem.grade_id}>
                  <td className="fw-bold" style={{ fontSize: 14 }}>
                    {gradeItem.grade}
                  </td>
                  {periodData.map((item) => {
                    const routines = masterRoutineData[item.period] || [];
                    const routine = routines.find(
                      (r) =>
                        r.grade_id === gradeItem.grade_id &&
                        r.day_id === dayFilter
                    );
                    if (routine) {
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
          sectionsList={selectedSectionData}
          teachersList={teacherData}
          subjectsList={subjectsList}
        />
      )}
      {isAddScheduleModalVisible && (
        <CreateMasterSchedule
          isOpen={isAddScheduleModalVisible}
          handleClose={handleCloseForRoutine}
        />
      )}
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The routine type updation ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </>
  );
};

export default CustomMasterRoutine;
