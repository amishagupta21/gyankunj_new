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
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { showAlertMessage } from "../../AlertMessage";
import { updateEmployeeInfo } from "../../../ApiClient";

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

const CreateAdmission = ({ isOpen, handleClose, selectedData = {} }) => {
  const { handleSubmit, reset, control } = useForm();
  const [showAlert, setShowAlert] = useState("");
  const [isEditMode, setIsEditMode] = useState(
      Object.keys(selectedData).length > 0
    );
  const categoryList = ["General", "SC", "ST", "OBC"];
  const languagesList = ["English", "Hindi", "French", "Bilingual"];
  const nationalitiesList = ["India"];
  const gradesList = ["Grade 1", "Grade 2", "Grade 3"];
  const gendersList = ["Male", "Female", "Other"];

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      const tempSelectedData = {
        ...selectedData,
        child_dob: selectedData.child_dob ? dayjs(selectedData.child_dob) : null,
        father_dob: selectedData.father_dob ? dayjs(selectedData.father_dob) : null,
        mother_dob: selectedData.mother_dob ? dayjs(selectedData.mother_dob) : null,
      };
      reset(tempSelectedData);
    }
  }, [selectedData, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      child_dob: data.child_dob ? dayjs(data.child_dob).format("YYYY-MM-DD") : null,
      father_dob: data.father_dob ? dayjs(data.father_dob).format("YYYY-MM-DD") : null,
      mother_dob: data.mother_dob ? dayjs(data.mother_dob).format("YYYY-MM-DD") : null,
    };

    // Submit the payload
    console.log(payload);
    // Perform the API request using the payload here
    updateEmployeeInfo(isEditMode, payload)
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

  const formFields = [
    { name: "child_name", label: "Child Name", type: "text", required: true },
    { name: "child_gender", label: "Child Gender", type: "select", options: gendersList, required: true },
    { name: "child_dob", label: "Child DOB", type: "date", required: true },
    { name: "child_nationality", label: "Child Nationality", type: "select", options: nationalitiesList, required: true },
    { name: "child_pan_card", label: "Child PAN Card", type: "text" },
    { name: "child_hobbies", label: "Child Hobbies", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "father_name", label: "Father Name", type: "text", required: true },
    { name: "father_dob", label: "Father DOB", type: "date" },
    { name: "father_nationality", label: "Father Nationality", type: "select", options: nationalitiesList },
    { name: "father_qualification", label: "Father Qualification", type: "text" },
    { name: "father_occupation", label: "Father Occupation", type: "text" },
    { name: "father_pan_card", label: "Father PAN Card", type: "text" },
    { name: "father_aadhar_number", label: "Father Aadhar Number", type: "number" },
    { name: "father_phone", label: "Father Phone", type: "number" },
    { name: "mother_name", label: "Mother Name", type: "text", required: true },
    { name: "mother_dob", label: "Mother DOB", type: "date" },
    { name: "mother_nationality", label: "Mother Nationality", type: "select", options: nationalitiesList },
    { name: "mother_qualification", label: "Mother Qualification", type: "text" },
    { name: "mother_occupation", label: "Mother Occupation", type: "text" },
    { name: "mother_phone", label: "Mother Phone", type: "number" },
    { name: "sibling_admission_number", label: "Sibling Admission Number", type: "text" },
    { name: "permanent_address", label: "Permanent Address", type: "text", required: true },
    { name: "local_address", label: "Local Address", type: "text" },
    { name: "office_address", label: "Office Address", type: "text" },
    { name: "category", label: "Category", type: "select", options: categoryList, required: true },
    { name: "current_school_or_coaching", label: "Current School/Coaching", type: "text" },
    { name: "current_class", label: "Current Class", type: "select", options: gradesList },
    { name: "applying_for_class", label: "Applying For Class", type: "select", options: gradesList, required: true },
    { name: "school_transport_required", label: "School Transport Required", type: "boolean" },
    { name: "mode_of_instruction", label: "Mode of Instruction", type: "select", options: languagesList },
    { name: "languages_known", label: "Languages Known", type: "select", options: languagesList, multiple: true },
    { name: "any_known_illness", label: "Any Known Illness", type: "boolean" },
    { name: "type_of_illness", label: "Type Of Illness", type: "text" },
  ];

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create Admission
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
            {formFields.map((fieldItem) => (
              <Grid item xs={6} key={fieldItem.name}>
                <FormControl fullWidth>
                  {fieldItem.type === "select" ? (
                    <Controller
                      name={fieldItem.name}
                      control={control}
                      rules={fieldItem.required ? { required: "This field is required" } : {}}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label={fieldItem.label}
                          select
                          variant="outlined"
                          fullWidth
                          error={!!fieldState?.error}
                        >
                          {Array.isArray(fieldItem.options) && fieldItem.options.length > 0 ? (
                            fieldItem.options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No options available</MenuItem>
                          )}
                        </TextField>
                      )}
                    />
                  ) : fieldItem.type === "date" ? (
                    <Controller
                      name={fieldItem.name}
                      control={control}
                      rules={fieldItem.required ? { required: "This field is required" } : {}}
                      render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={fieldItem.label}
                            {...field}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  ) : fieldItem.type === "boolean" ? (
                    <Controller
                      name={fieldItem.name}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label={fieldItem.label}
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name={fieldItem.name}
                      control={control}
                      rules={fieldItem.required ? { required: "This field is required" } : {}}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label={fieldItem.label}
                          variant="outlined"
                          fullWidth
                          type={fieldItem.type === "number" || fieldItem.type === "email" ? fieldItem.type : "text"}
                          error={!!fieldState?.error}
                        />
                      )}
                    />
                  )}
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="reset" onClick={() => reset()}>Reset</Button>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </DialogActions>
      </form>
      {showAlert && showAlertMessage({ open: true, alertFor: showAlert, message: "Admission Created Successfully." })}
    </BootstrapDialog>
  );
};

export default CreateAdmission;