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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import { geAllLeaveTypes, submitLeaveApplication } from "../../ApiClient";
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
    width: "75%", // Default width
    overflow: "hidden",
    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      width: "95%", // Slightly smaller than full width
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%", // Adjusted width on medium screens
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%", // Adjusted width on large screens
    },
  },
}));

const PaApplyLeaveForm = ({
  isOpen,
  handleClose,
  selectedLeaveDetails = {},
}) => {
  const { handleSubmit, setValue, reset, control } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [showAlert, setShowAlert] = useState("");
  const [leaveTypesList, setLeaveTypesList] = useState([]);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (selectedLeaveDetails && Object.keys(selectedLeaveDetails).length > 0) {
      setValue("leave_type_id", selectedLeaveDetails.leave_type_id);
      setValue("leave_data", selectedLeaveDetails.leave_data);
      setValue("start_date", dayjs(selectedLeaveDetails.start_date));
      setValue("end_date", dayjs(selectedLeaveDetails.end_date));
      setValue("no_of_days", selectedLeaveDetails.no_of_days);
      setStartDate(dayjs(selectedLeaveDetails.start_date));
    }
  }, [selectedLeaveDetails, setValue]);

  useEffect(() => {
    geAllLeaveTypes()
      .then((res) => {
        if (res?.data?.leave_type_data?.length > 0) {
          setLeaveTypesList(res.data.leave_type_data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    const formattedStartDate = dayjs(data.start_date).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(data.end_date).format("YYYY-MM-DD");
    const noOfDays =
      dayjs(formattedEndDate).diff(formattedStartDate, "day") + 1;

    let payload = {
      ...data,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      no_of_days: noOfDays,
    };
    payload["parent_id"] = userInfo.user_id;
    submitLeaveApplication(payload)
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("end_date", null);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        //onClose={() => handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedLeaveDetails.leave_id ? "Edit Leave" : "Apply Leave"}
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
            <FormControl className="mb-4" fullWidth>
              <Controller
                name="student_id"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <InputLabel error={!!error}>Student</InputLabel>
                    <Select
                      label="Student"
                      onChange={onChange}
                      value={value || ""}
                      error={!!error}
                    >
                      {userInfo.student_info.map((item, index) => (
                        <MenuItem key={index} value={item.student_id}>
                          {item.student_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={dayjs()}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          minDate={
                            selectedLeaveDetails.leave_id
                              ? dayjs(selectedLeaveDetails.start_date)
                              : dayjs()
                          }
                          format="YYYY-MM-DD"
                          label="Start Date"
                          value={value || null}
                          onChange={(newValue) => {
                            onChange(newValue);
                            handleStartDateChange(newValue);
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
                    name="end_date"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={dayjs()}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          minDate={startDate || dayjs()}
                          format="YYYY-MM-DD"
                          label="End Date"
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
            <FormControl className="mb-4" fullWidth>
              <Controller
                name="leave_type_id"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <InputLabel error={!!error}>Leave type</InputLabel>
                    <Select
                      label="Leave type"
                      onChange={onChange}
                      value={value || ""}
                      error={!!error}
                    >
                      {leaveTypesList?.map((item) => (
                        <MenuItem
                          key={item.leave_type_id}
                          value={item.leave_type_id}
                        >
                          {item.leave_type}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="leave_data"
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
                    label="Leave reason"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              className="me-3"
              variant="outlined"
              type="reset"
              onClick={() => {
                setStartDate(null);
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
          message: `The leave ${
            selectedLeaveDetails.leave_id ? "updation" : "application"
          } ${showAlert === "success" ? "succeeded" : "failed"}.`,
        })}
    </React.Fragment>
  );
};

export default PaApplyLeaveForm;
