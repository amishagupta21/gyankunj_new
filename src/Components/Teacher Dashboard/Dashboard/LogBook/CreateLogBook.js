import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
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
import {
  getAllPeriodsList,
  getGradeDetails,
  getSubjectsList,
  saveLogBook,
} from "../../../../ApiClient";
import { showAlertMessage } from "../../../AlertMessage";

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
    width: "75%", // Adjust the value as needed
    height: "100%",
    overflow: "hidden",
  },
}));

const CreateLogBook = ({ isOpen, handleClose, selectedLog = {} }) => {
  const { handleSubmit, getValues, setValue, reset, control } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [selectedGradeId, setSelectedGradeId] = useState(0);
  const [selectedLogBookData] = useState(selectedLog);
  const [isEditMode, setIsEditMode] = useState(false);
  const [gradeData, setGradeData] = useState([]);
  const [periodsList, setPeriodsList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    if (selectedLogBookData && Object.keys(selectedLogBookData).length > 0) {
      setIsEditMode(true);
      const {
        grade_id,
        section_id,
        period_id,
        subject_id,
        content_taught,
        home_work,
      } = selectedLogBookData;
      setValue("grade_id", grade_id);
      setValue("section_id", section_id);
      setValue("period_id", period_id);
      setValue("subject_id", subject_id);
      setValue("content_taught", content_taught);
      setValue("home_work", home_work);
      setSelectedGradeId(grade_id);
    }
  }, [selectedLogBookData, setValue]);

  useEffect(() => {
    getGradesList();
    getAllSubjectsData();
    getAllPeriodsData();
  }, []);

  const getAllPeriodsData = () => {
    getAllPeriodsList(userInfo.routine_id)
      .then((res) => {
        if (res?.data?.periods && res.data.periods.length > 0) {
          setPeriodsList(res.data.periods);
        }
      })
      .catch((err) => console.log(err));
  };

  const getGradesList = () => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
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

  const handleGradeChange = (e) => {
    setSelectedGradeId(e.target.value);
    setValue("grade_id", e.target.value);
    setValue("section_id", "");
  };

  const onSubmit = (data) => {
    let payload = { ...data };
    payload["date"] = dayjs().format("YYYY-MM-DD");
    payload["teacher_id"] = userInfo.user_id;

    if (isEditMode) {
      payload = {
        log_book_id: selectedLog.log_book_id,
        content_taught: data.content_taught,
        home_work: data.home_work,
      };
    }

    saveLogBook(payload)
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
        // onClose={() => handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isEditMode ? "Edit Log" : "Create New Log"}
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="grade_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Grade</InputLabel>
                        <Select
                          disabled={isEditMode}
                          onChange={(e) => {
                            onChange(e.target.value);
                            handleGradeChange(e);
                          }}
                          value={value || ""}
                          error={!!error}
                        >
                          {gradeData?.map((item) => (
                            <MenuItem key={item.grade_id} value={item.grade_id}>
                              {item.grade}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
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
                          disabled={isEditMode}
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {selectedGradeId && gradeData
                            ? gradeData
                                .find(
                                  (grade) => grade.grade_id === selectedGradeId
                                )
                                ?.section_list.map((section) => (
                                  <MenuItem
                                    key={section.section_id}
                                    value={section.section_id}
                                  >
                                    {section.section_name}
                                  </MenuItem>
                                ))
                            : null}
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
                          disabled={isEditMode}
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="period_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Period</InputLabel>
                        <Select
                          disabled={isEditMode}
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {periodsList?.map((item) => (
                            <MenuItem key={item.period_id} value={item.period_id}>
                              {item.period}
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
                    name="content_taught"
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
                        label="Content Taught"
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="home_work"
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
                        label="Home Work"
                        variant="outlined"
                        multiline
                        rows={3}
                      />
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
              disabled={isEditMode}
              type="reset"
              onClick={() => {
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
          message: `The log book ${isEditMode ? "updation" : "creation"} ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </React.Fragment>
  );
};

export default CreateLogBook;
