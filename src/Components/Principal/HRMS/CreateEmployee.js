import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { saveLogBook } from "../../../ApiClient";
import { showAlertMessage } from "../../AlertMessage";

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
    width: "75%",
    height: "100%",
    overflow: "hidden",
  },
}));

const CreateEmployee = ({ isOpen, handleClose, selectedData = {} }) => {
  const { handleSubmit, reset, control } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setIsEditMode(true);
      const tempSelectedData = {
        ...selectedData,
        dob: selectedData.dob ? dayjs(selectedData.dob) : null,
        doj: selectedData.doj ? dayjs(selectedData.doj) : null,
      };
      reset(tempSelectedData);
    }
  }, [selectedData, reset]);

  const onSubmit = (data) => {
    saveLogBook(data)
      .then((res) => {
        setShowAlert(res?.data?.status === "success" ? "success" : "error");
        setTimeout(() => {
          handleClose(true);
          setTimeout(() => setShowAlert(""), 2000);
        }, 1000);
      })
      .catch(() => {
        setShowAlert("error");
        setTimeout(() => setShowAlert(""), 3000);
      });
  };

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {isEditMode ? "Edit Employee" : "Create New Employee"}
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "calc(100% - 64px)" }}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="Date of Birth"
                        format="DD-MM-YYYY"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="doj"
                  control={control}
                  rules={{ required: "Date of Joining is required" }}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="Date of Joining"
                        format="DD-MM-YYYY"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormControl>
            </Grid>
            {/* Phone with Number Validation */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      variant="outlined"
                      type="number"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* Email with Validation */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* New Fields */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="designation"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Designation" variant="outlined" fullWidth />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => <Checkbox {...field} checked={field.value} />}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Address" variant="outlined" multiline rows={4} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The employee ${isEditMode ? "updation" : "creation"} ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </BootstrapDialog>
  );
};

export default CreateEmployee;
