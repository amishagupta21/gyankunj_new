import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { updateFleetStaff } from "../../../../ApiClient";
import dayjs from "dayjs";

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

const CreateFleetStaff = ({ isOpen, handleClose, initialData = null }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      staff_name: "",
      employee_id: "",
      staff_role: "",
      phone_number: "",
      gender: "",
      date_of_birth: "",
      license_number: "",
      license_expiry_date: "",
    },
  });

  const [showAlert, setShowAlert] = useState("");
  const staffRoles = [
    { id: 1, name: "Driver" },
    { id: 2, name: "Conductor" },
    { id: 3, name: "Mechanic" },
    { id: 4, name: "Cleaner" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    if (initialData) {
      //reset(initialData); // Populate form with existing data
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);

    updateFleetStaff(data)
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

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Fleet Staff
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
            <Grid container spacing={2}>
              {/* Staff Name */}
              <Grid item xs={12}>
                <Controller
                  name="staff_name"
                  control={control}
                  rules={{ required: "Staff Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Staff Name"
                      fullWidth
                      error={!!errors.staff_name}
                    />
                  )}
                />
              </Grid>

              {/* Staff Role */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Staff Role</InputLabel>
                  <Controller
                    name="staff_role"
                    control={control}
                    rules={{ required: "Staff Role is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Staff Role"
                        error={!!errors.staff_role}
                      >
                        {staffRoles.map((role) => (
                          <MenuItem key={role.id} value={role.name}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Employee ID */}
              <Grid item xs={12}>
                <Controller
                  name="employee_id"
                  control={control}
                  rules={{ required: "Employee ID is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Employee ID"
                      fullWidth
                      error={!!errors.employee_id}
                    />
                  )}
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12}>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{8,12}$/,
                      message: "Phone number must be between 8 to 12 digits",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.phone_number}
                    />
                  )}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <Select {...field} label="Gender" error={!!errors.gender}>
                        {genderOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12}>
                <Controller
                  name="date_of_birth"
                  control={control}
                  rules={{
                    required: "Date of Birth is required",
                    validate: (value) =>
                      dayjs(value).isBefore(dayjs()) ||
                      "Date must be in the past",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Date of Birth"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.date_of_birth}
                    />
                  )}
                />
              </Grid>

              {/* License Number */}
              <Grid item xs={12}>
                <Controller
                  name="license_number"
                  control={control}
                  rules={{ required: "License Number is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="License Number"
                      fullWidth
                      error={!!errors.license_number}
                    />
                  )}
                />
              </Grid>

              {/* License Expiry Date */}
              <Grid item xs={12}>
                <Controller
                  name="license_expiry_date"
                  control={control}
                  rules={{
                    required: "License Expiry Date is required",
                    validate: (value) =>
                      dayjs(value).isAfter(dayjs()) ||
                      "Date must be in the future",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="License Expiry Date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.license_expiry_date}
                    />
                  )}
                />
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
      </BootstrapDialog>

      {showAlert && (
        <div>
          {showAlert === "success"
            ? "Fleet staff update succeeded!"
            : "Fleetstaff update failed!"}
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateFleetStaff;
