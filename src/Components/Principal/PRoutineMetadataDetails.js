import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchAllRoutines, getMasterRoutineMetadataInfo, updateMasterRoutineType, upsertMasterSchedule } from "../../ApiClient";
import { showAlertMessage } from "../AlertMessage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "calc(100% - 53px)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "90%",
    width: "35%",
    overflow: "hidden",
  },
}));

const PRoutineMetadataDetails = () => {
  const userInfo = useMemo(
    () => JSON.parse(localStorage.getItem("UserData")),
    []
  );
  const [routinesList, setRoutinesList] = useState([]);
  const { handleSubmit, reset, control, setValue, getValues } = useForm();
  const [showAlert, setShowAlert] = useState("");
  const [isAddScheduleModalVisible, setIsAddScheduleModalVisible] = useState(false);
  const periodDurationsList = [15, 30, 45, 60];

  useEffect(() => {
    getRoutineMetadata();
  }, []);

  const getRoutineMetadata = async () => {
    try {
      const res = await fetchAllRoutines();
      setRoutinesList(res?.data?.routines || []);
    } catch (err) {
      console.error("Failed to fetch routine metadata:", err);
    }
  };

  const handleClose = (isSubmit) => {
    if (isSubmit) getRoutineMetadata();
    setIsAddScheduleModalVisible(false);
  };

  const onSubmit = (data) => {
    // Helper function to format time to "HH:mm:ss"
    const formatTime = (time) => (time ? dayjs(time).format("HH:mm:ss") : null);

    // Construct payload from form data
    const payload = {
      routine_type: data.routine_type,
      start_time: formatTime(data.start_time),
      end_time: formatTime(data.end_time),
      period_count: data.period_count,
      period_duration: data.period_duration,
      break_start_time: formatTime(data.break_start_time),
      break_end_time: formatTime(data.break_end_time),
      assembly_start_time: formatTime(data.assembly_start_time),
      assembly_end_time: formatTime(data.assembly_end_time),
    };

    // Send payload to server
    upsertMasterSchedule(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          handleClose(true);
          setTimeout(() => {
            setShowAlert("");
          }, 2000);
        }, 1000);
      })
      .catch((err) => {
        setShowAlert("error");
        setTimeout(() => {
          setShowAlert("");
        }, 3000);
      });
  };

  const handleRoutineTypeChange = (isChecked, routine) => {
    if (!isChecked) return false;

    routinesList.map((item) => {
      item.is_active = item.routine_id === routine.routine_id ? true : false;
    });
    const payload = {
      "routine_id": routine.routine_id
    }
    updateMasterRoutineType(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
          userInfo.routine_id = routine.routine_id;
          userInfo.routine_type = routine.routine_type;
          localStorage.setItem("UserData", JSON.stringify(userInfo));
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          setShowAlert("");
        }, 1000);
      })
      .catch((err) => {
        setShowAlert("error");
        setTimeout(() => {
          setShowAlert("");
        }, 3000);
      });

  };

  const renderTimePicker = (name, label, dependentField) => (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={label}
            ampm={false}
            value={value || null}
            minTime={
              name.includes("end") && dependentField
                ? getValues()[dependentField]
                : null
            }
            format="HH:mm"
            onChange={(val) => {
              onChange(val ? dayjs(val) : null);
              if (name.includes("start") && dependentField) {
                setValue(dependentField, null);
              }
            }}
            slotProps={{
              textField: {
                variant: "outlined",
                error: !!error,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          Routine metadata
        </Typography>
        <Button variant="contained" onClick={() => setIsAddScheduleModalVisible(true)}>Create routine</Button>
      </Box>
      {routinesList.length > 0 && (
        routinesList.map((routine, index) => {
          return (
            <Card key={routine.routine_id} className="bg-info-subtle" sx={{ maxWidth: "100%", margin: "0 auto", mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Routine Type:</strong> {routine.routine_type || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="d-flex align-items-center" variant="body1">
                      <strong>Is Active:</strong>{" "}
                      <FormControl>
                        <FormControlLabel
                          label={routine?.is_active ? "Yes" : "No"}
                          labelPlacement="start"
                          control={
                            <Checkbox
                              checked={!!routine?.is_active} // Ensure it's always a boolean
                              onChange={(e) => handleRoutineTypeChange(e.target.checked, routine)}
                            />
                          }
                        />
                      </FormControl>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Period Count:</strong> {routine.period_count || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Period Duration:</strong>{" "}
                      {routine.period_duration || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Start Time:</strong> {routine.start_time || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>End Time:</strong> {routine.end_time || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Break Start Time:</strong>{" "}
                      {routine.break_start_time || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Break End Time:</strong>{" "}
                      {routine.break_end_time || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Assembly Start Time:</strong>{" "}
                      {routine.assembly_start_time || 'N|A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Assembly End Time:</strong>{" "}
                      {routine.assembly_end_time || 'N|A'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card >
          )
        })
      )}
      {
        routinesList.length === 0 &&
        <Typography variant="h6" className="text-danger text-center">
          No details available
        </Typography>
      }

      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={isAddScheduleModalVisible}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Schedule
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
        </DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="routine_type"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        error={!!error}
                        onChange={onChange}
                        value={value || ""}
                        fullWidth
                        label="Routine Type"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker("start_time", "Start Time", "end_time")}
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker("end_time", "End Time", "start_time")}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name="period_count"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        error={!!error}
                        onChange={onChange}
                        value={value || ""}
                        fullWidth
                        label="Period Count"
                        type="number"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name="period_duration"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Period Duration</InputLabel>
                        <Select
                          label="Period Duration"
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {periodDurationsList.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker(
                  "break_start_time",
                  "Break Start Time",
                  "break_end_time"
                )}
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker(
                  "break_end_time",
                  "Break End Time",
                  "break_start_time"
                )}
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker(
                  "assembly_start_time",
                  "Assembly Start Time",
                  "assembly_end_time"
                )}
              </Grid>
              <Grid item xs={6}>
                {renderTimePicker(
                  "assembly_end_time",
                  "Assembly End Time",
                  "assembly_start_time"
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="me-3"
              variant="outlined"
              type="reset"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
        {showAlert &&
          showAlertMessage({
            open: true,
            alertFor: showAlert,
            message: `The routine creation ${showAlert === "success" ? "succeeded" : "failed"
              }.`,
          })}
      </BootstrapDialog>
    </>
  );
};

export default PRoutineMetadataDetails;
