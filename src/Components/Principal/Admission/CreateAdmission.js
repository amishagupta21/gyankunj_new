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
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { showAlertMessage } from "../../AlertMessage";
import {updateUserInfo } from "../../../ApiClient";
import { useNavigate } from "react-router-dom";

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

const CreateAdmission = ({ isOpen, handleClose, selectedData = {}, gradesList = [] }) => {
  const { handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      date_of_birth: null,
      date_of_joining: null,
      country: "",
      child_pan_card: "",
      child_hobbies: "",
      email_id: "",
      father_name: "",
      father_email_id: "",
      father_dob: null,
      father_nationality: "",
      father_qualification: "",
      father_occupation: "",
      father_pan_card: "",
      father_aadhar_number: "",
      father_phone: "",
      mother_name: "",
      mother_email_id: "",
      mother_dob: null,
      mother_nationality: "",
      mother_qualification: "",
      mother_occupation: "",
      mother_phone: "",
      sibling_admission_number: "",
      address: "",
      local_address: "",
      office_address: "",
      category: "",
      current_school_or_coaching: "",
      current_class: "",
      applying_for_class: "",
      school_transport_required: false,
      mode_of_instruction: "",
      languages_known: [],
      any_known_illness: false,
      type_of_illness: "",
    },
  });
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState("");
  const isEditMode = Object.keys(selectedData).length > 0;
  const metaData = {
    "categoryList": [
      { "id": "general", "name": "General" },
      { "id": "sc", "name": "SC" },
      { "id": "st", "name": "ST" },
      { "id": "obc", "name": "OBC" }
    ],
    "languagesList": [
      { "id": "english", "name": "English" },
      { "id": "hindi", "name": "Hindi" }
    ],
    "nationalitiesList": [
      { "id": "india", "name": "India" },
      { "id": "nri", "name": "NRI" }
    ],
    "gendersList": [
      { "id": "male", "name": "Male" },
      { "id": "female", "name": "Female" },
      { "id": "other", "name": "Other" }
    ],
    "gradesList": gradesList
  }  

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      reset({
        ...selectedData,
        date_of_birth: selectedData.date_of_birth ? dayjs(selectedData.date_of_birth) : null,
        date_of_joining: selectedData.date_of_joining ? dayjs(selectedData.date_of_joining) : null,
        father_dob: selectedData.father_dob ? dayjs(selectedData.father_dob) : null,
        mother_dob: selectedData.mother_dob ? dayjs(selectedData.mother_dob) : null,
      });
    } else {
      reset(); // Reset the form for fresh admission
    }
  }, [selectedData, reset]);
  

  const [primaryPhone, setPrimaryPhone] = useState(null); // Track the primary phone

  const handlePrimaryPhoneChange = (fieldName) => {
    // Only allow one primary phone
    setPrimaryPhone(fieldName);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      phone_number: data[primaryPhone] ?? data.father_phone ?? data.mother_phone,
      user_id: isEditMode ? selectedData.user_id : undefined,
      role_id: 4,
      date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth).format("YYYY-MM-DD") : null,
      date_of_joining: data.date_of_joining ? dayjs(data.date_of_joining).format("YYYY-MM-DD") : null,
      father_dob: data.father_dob ? dayjs(data.father_dob).format("YYYY-MM-DD") : null,
      mother_dob: data.mother_dob ? dayjs(data.mother_dob).format("YYYY-MM-DD") : null,
    };

    // Submit the payload
    console.log(payload);
    // Perform the API request using the payload here
    updateUserInfo(isEditMode, payload)
      .then((res) => {
        setShowAlert(res?.data?.status === "success" ? "success" : "error");
        setTimeout(() => {
          if(res?.data?.status === "success"){
            navigate(`/principalDashboard/financeView?activeView=earning`);
          }
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
    { name: "name", label: "Child Name", type: "text", required: true },
    { name: "gender", label: "Child Gender", type: "select", options: metaData.gendersList, required: true },
    { name: "date_of_birth", label: "Child DOB", type: "date", required: true },
    { name: "date_of_joining", label: "Child DOJ", type: "date", required: true },
    { name: "country", label: "Child Nationality", type: "select", options: metaData.nationalitiesList, required: true },
    { name: "child_pan_card", label: "Child PAN Card", type: "text" },
    { name: "child_hobbies", label: "Child Hobbies", type: "text" },
    { name: "email_id", label: "Email", type: "email", required: true },
    { name: "father_name", label: "Father Name", type: "text", required: true },
    { name: "father_email_id", label: "Father Email", type: "email" },
    { name: "father_dob", label: "Father DOB", type: "date" },
    { name: "father_nationality", label: "Father Nationality", type: "select", options: metaData.nationalitiesList },
    { name: "father_qualification", label: "Father Qualification", type: "text" },
    { name: "father_occupation", label: "Father Occupation", type: "text" },
    { name: "father_pan_card", label: "Father PAN Card", type: "text" },
    { name: "father_aadhar_number", label: "Father Aadhar Number", type: "number" },
    { name: "father_phone", label: "Father Phone", type: "number", isPrimary: true },
    { name: "mother_name", label: "Mother Name", type: "text", required: true },
    { name: "mother_email_id", label: "Mother Email", type: "email" },
    { name: "mother_dob", label: "Mother DOB", type: "date" },
    { name: "mother_nationality", label: "Mother Nationality", type: "select", options: metaData.nationalitiesList },
    { name: "mother_qualification", label: "Mother Qualification", type: "text" },
    { name: "mother_occupation", label: "Mother Occupation", type: "text" },
    { name: "mother_phone", label: "Mother Phone", type: "number", isPrimary: true },
    { name: "sibling_admission_number", label: "Sibling Admission Number", type: "text" },
    { name: "address", label: "Permanent Address", type: "text", multiline: true, required: true },
    { name: "local_address", label: "Local Address", type: "text", multiline: true },
    { name: "office_address", label: "Office Address", type: "text", multiline: true },
    { name: "category", label: "Category", type: "select", options: metaData.categoryList, required: true },
    { name: "current_school_or_coaching", label: "Current School/Coaching", type: "text" },
    { name: "current_class", label: "Current Class", type: "select", options: metaData.gradesList },
    { name: "applying_for_class", label: "Applying For Class", type: "select", options: metaData.gradesList, required: true },
    { name: "school_transport_required", label: "School Transport Required", type: "boolean" },
    { name: "mode_of_instruction", label: "Mode of Instruction", type: "select", options: metaData.languagesList },
    { name: "languages_known", label: "Languages Known", type: "select", options: metaData.languagesList, multiple: true },
    { name: "any_known_illness", label: "Any Known Illness", type: "boolean" },
    { name: "type_of_illness", label: "Type Of Illness", type: "text" },
  ];

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {isEditMode ? "Edit Student Info" : "Add New Student"}
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
                      rules={{ required: fieldItem.required }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label={fieldItem.label}
                          select
                          variant="outlined"
                          fullWidth
                          error={!!fieldState?.error}
                          value={field.value ?? ""}
                        >
                          {Array.isArray(fieldItem.options) && fieldItem.options.length > 0 ? (
                            fieldItem.options.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
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
                      rules={{ required: fieldItem.required }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            label={fieldItem.label}
                            value={field.value || null} // Always controlled
                            onChange={(newValue) => field.onChange(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  ) : fieldItem.type === "boolean" ? (
                    <Controller
                    rules={{ required: fieldItem.required }}
                      name={fieldItem.name}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value ?? false} />}
                          label={fieldItem.label}
                        />
                      )}
                    />
                  ) : (
                    <>
                      <Controller
                        name={fieldItem.name}
                        rules={{
                          required: fieldItem.name === 'father_phone'
                            ? !watch("mother_phone") // Father phone is required if mother phone is not provided
                            : fieldItem.name === 'mother_phone'
                            ? !watch("father_phone") // Mother phone is required if father phone is not provided
                            : fieldItem.required // Default requirement based on the fieldItem
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                          <TextField
                            {...field}
                            label={fieldItem.label}
                            variant="outlined"
                            fullWidth
                            multiline={fieldItem.multiline || false}
                            rows={fieldItem.multiline ? 3 : 1}
                            type={fieldItem.type === "number" || fieldItem.type === "email" ? fieldItem.type : "text"}
                            error={!!fieldState?.error}
                            value={field.value ?? ""}
                          />
                          {fieldItem.isPrimary && watch(fieldItem.name) && (
                            <FormControlLabel
                            control={
                              <Radio
                                checked={primaryPhone === fieldItem.name}
                                onChange={() => {
                                  handlePrimaryPhoneChange(fieldItem.name);
                                }}
                              />
                            }
                            label="Mark as Primary Phone Number"
                          />
                          )}
                        </>
                        )}
                      />
                  </>
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
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: showAlert === "success" ? "Admission Created successfully!" : "Failed to create admission.",
        })
      }
    </BootstrapDialog>
  );
};

export default CreateAdmission;