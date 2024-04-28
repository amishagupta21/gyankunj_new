import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { getSubjectsList, getTeachersData } from "../../../ApiClient";
import { showAlertMessage } from "../../AlertMessage";
import { TimePicker } from "@mui/x-date-pickers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "calc(100% - 53px)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  // Adjust the maxWidth property to increase the width of the dialog
  "& .MuiDialog-paper": {
    maxWidth: "90%", // Adjust the value as needed
    // width: "75%", // Adjust the value as needed
    //height: "100%",
    overflow: "hidden",
  },
}));

const CreateMasterRoutine = ({
  isOpen,
  handleClose,
  selectedData = {},
  selectedSectionData = [],
}) => {
  const { handleSubmit, getValues, setValue, reset, control } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [isEditMode, setIsEditMode] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const [selectedRoutineData] = useState(selectedData);
  const [subjectsList, setSubjectsList] = useState([]);
  const [showAlert, setShowAlert] = useState("");
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (selectedRoutineData && selectedRoutineData.subject_id) {
      setIsEditMode(true);
      const currentDateOnly = dayjs().format("YYYY-MM-DD");
      setValue("section_id", selectedRoutineData.section_id);
      setValue("subject_id", selectedRoutineData.subject_id);
      setValue("teacher_id", selectedRoutineData.teacher_id);

      // Convert time strings to dayjs objects
      const startTime = dayjs(`${currentDateOnly}T${selectedRoutineData.start_time}`);
      const endTime = dayjs(`${currentDateOnly}T${selectedRoutineData.end_time}`);
      debugger;
      // Set form values
      setValue("start_time", startTime);
      setValue("end_time", endTime);
      setStartTime(startTime);
    }
  }, [selectedRoutineData, setValue]);

  useEffect(() => {
    getAllSubjectsData();
    getAllTeachersData();
  }, []);

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

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleStartTimeChange = (time) => {
    debugger;
    setStartTime(time);
    setValue("end_time", "");
    console.log("Start time value changed to:", time);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isEditMode ? "Edit Routine" : "Create New Routine"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "calc(100% - 64px)" }}
        >
          <DialogContent dividers>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="section_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Section</InputLabel>
                        <Select
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {selectedSectionData?.map((item) => (
                            <MenuItem
                              key={item.section_id}
                              value={item.section_id}
                            >
                              {item.section_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="subject_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Subject</InputLabel>
                        <Select
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {subjectsList?.map((item) => (
                            <MenuItem
                              key={item.subject_id}
                              value={item.subject_id}
                            >
                              {item.subject_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="teacher_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Teacher</InputLabel>
                        <Select
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {teacherData?.map((item) => (
                            <MenuItem
                              key={item.teacher_id}
                              value={item.teacher_id}
                            >
                              {item.teacher_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="start_time"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          //   minTime={
                          //     isEditMode
                          //       ? dayjs(selectedData.start_time).format('HH:mm')
                          //       : dayjs()
                          //   }
                          format="HH:mm"
                          label="Start Time"
                          value={value || null}
                          onChange={(newValue) => {
                            onChange(newValue);
                            handleStartTimeChange(newValue);
                          }}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: !!error,
                              helperText: error?.message,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="end_time"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          //  minTime={startTime || dayjs().format('HH:mm')}
                          format="HH:mm"
                          label="End Time"
                          value={value || null}
                          onChange={onChange}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: !!error,
                              helperText: error?.message,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="me-3"
              variant="outlined"
              type="reset"
              onClick={() => {
                setStartTime(null);
                reset();
              }}
            >
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>

      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The routine ${isEditMode ? "updation" : "creation"} ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </React.Fragment>
  );
};

export default CreateMasterRoutine;
