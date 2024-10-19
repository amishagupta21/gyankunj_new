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
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getAllDesignationsList, updateEmployeeInfo } from "../../../ApiClient";
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
  const { handleSubmit, reset, control, watch } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [designationsList, setDesignationsList] = useState([]);
  const isMarried = watch("is_married", false);
  const gendersList = [
    { value: "male", title: "Male" },
    { value: "female", title: "Female" },
    { value: "other", title: "Other" },
  ];

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

  useEffect(() => {
    getAllDesignationsList()
      .then((res) => {
        setDesignationsList([]);
        if (res?.data?.roles_data?.length > 0) {
          setDesignationsList(res.data.roles_data);
        }
      })
      .catch(() => {
        setShowAlert("error");
        setTimeout(() => setShowAlert(""), 3000);
      });
  }, []);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : null,
      doj: data.doj ? dayjs(data.doj).format("YYYY-MM-DD") : null,
    };

    updateEmployeeInfo(payload)
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "calc(100% - 64px)" }}
      >
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="employeecode"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Employee Code"
                      variant="outlined"
                      placeholder="System-generated value"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="employeename"
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
                      label="Employee Name"
                      variant="outlined"
                    />
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
                    required: true,
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Phone"
                      variant="outlined"
                      type="number"
                      helperText={error?.message}
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
                    required: true,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      helperText={error?.message}
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
                  rules={{
                    required: true,
                    validate: (value) => {
                      const selectedDate = dayjs(value);
                      const today = dayjs();
                      const age = today.diff(selectedDate, "year");
                      if (!selectedDate.isValid()) {
                        return "Invalid date";
                      }
                      if (age < 18) {
                        return "Employee must be at least 18 years old";
                      }
                      if (selectedDate.isAfter(today)) {
                        return "Date of Birth cannot be in the future";
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="YYYY-MM-DD"
                        label="Date of birth"
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="doj"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      const selectedDate = dayjs(value);
                      const today = dayjs();
                      if (!selectedDate.isValid()) {
                        return "Invalid date";
                      }
                      if (selectedDate.isAfter(today)) {
                        return "Date of Joining cannot be in the future";
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="YYYY-MM-DD"
                        label="Date of joining"
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Gender"
                      onChange={onChange}
                      value={value || ""}
                      error={!!error}
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {gendersList?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="designationid"
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Designation"
                      onChange={onChange}
                      value={value || ""}
                      error={!!error}
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {designationsList?.map((item) => (
                        <MenuItem key={item.role_id} value={item.role_id}>
                          {item.role_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Controller
                      name="is_active"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Checkbox
                          onChange={onChange}
                          checked={!!value}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label="Active"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Controller
                      name="is_married"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Checkbox
                          onChange={onChange}
                          checked={!!value}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label="Married"
                />
              </FormControl>
            </Grid>
            {isMarried ? (
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name="spousename"
                    control={control}
                    rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        error={!!error}
                        onChange={onChange}
                        value={value || ""}
                        fullWidth
                        label="Spouse Name"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name="fathersname"
                    control={control}
                    rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        error={!!error}
                        onChange={onChange}
                        value={value || ""}
                        fullWidth
                        label="Father Name"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="highestqualification"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Highest Qualification"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="pancard"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Pan Card"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="aadharnumber"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      type="number"
                      label="Aadhar Number"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="bankaccount"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      type="number"
                      label="Bank Account"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="salaryscale"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      fullWidth
                      label="Salary Scale"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                      label="Address"
                      multiline
                      rows={3}
                      variant="outlined"
                      fullWidth
                    />
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
