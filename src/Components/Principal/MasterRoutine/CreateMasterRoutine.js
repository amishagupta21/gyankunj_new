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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { createMasterRoutine } from "../../../ApiClient";
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
    width: "35%",
    //height: "100%",
    overflow: "hidden",
  },
}));

const CreateMasterRoutine = ({
  isOpen,
  handleClose,
  selectedData,
  sectionsList = [],
  teachersList = [],
  subjectsList = [],
}) => {
  const { handleSubmit, setValue, reset, control } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRoutineData, setSelectedRoutineData] = useState();
  const [showAlert, setShowAlert] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");

  useEffect(() => {
    if (selectedData && selectedData.subject_id) {
      setIsEditMode(true);
    }
    setSelectedRoutineData(selectedData);
  }, [selectedData]);

  useEffect(() => {
    if (selectedRoutineData && selectedRoutineData.subject_id) {
      setValue("section_id", selectedRoutineData.section_id);
      setValue("subject_id", selectedRoutineData.subject_id);
      setValue("teacher_id", selectedRoutineData.teacher_id);
    }
  }, [selectedRoutineData, setValue]);

  const onSubmit = (data) => {
    const payload = {
      period_id: selectedData.period_id,
      grade_id: selectedData.grade_id,
      section_id: data.section_id,
      teacher_id: data.teacher_id,
      subject_id: data.subject_id,
      day_id: selectedData.day_id,
    };

    createMasterRoutine(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
          let successMsg = `The routine ${isEditMode ? "updation" : "creation"} succeeded .`;
          setShowErrorMessage(successMsg);
        } else {
          setShowErrorMessage(res?.data?.message);
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
                          label="Section"
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {sectionsList?.map((item) => (
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
                          label="Subject"
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
                          label="Teacher"
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {teachersList?.map((item) => (
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
          </DialogContent>
          <DialogActions>
            <Button
              className="me-3"
              variant="outlined"
              type="reset"
              onClick={reset}
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
          message: showErrorMessage,
        })}
    </React.Fragment>
  );
};

export default CreateMasterRoutine;
