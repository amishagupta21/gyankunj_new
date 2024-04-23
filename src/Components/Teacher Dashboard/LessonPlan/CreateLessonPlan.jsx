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
import {
  getGradeDetails,
  getLessonPlanMetadata,
  getSubjectsList,
  lessonPlanAllDetails,
  saveLessonPlan,
} from "../../../ApiClient";
import { showAlertMessage } from "../../AlertMessage";

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

const CreateLessonPlan = ({ isOpen, handleClose, selectedLessonId = 0 }) => {
  const { handleSubmit, getValues, setValue, reset, control } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [selectedGradeId, setSelectedGradeId] = useState(0);
  const [lessonDetails, setLessonDetails] = useState({});
  const [gradeData, setGradeData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);
  const [showAlert, setShowAlert] = useState("");
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (selectedLessonId > 0) {
      lessonPlanAllDetails(selectedLessonId)
        .then((res) => {
          if (
            res?.data?.lesson_plan_data &&
            res?.data?.lesson_plan_data.length > 0
          ) {
            setLessonDetails(res.data.lesson_plan_data[0]);
          }
        })
        .catch((err) => console.log("Lesson err - ", err));
    }
  }, [selectedLessonId]);

  useEffect(() => {
    if (lessonDetails && Object.keys(lessonDetails).length > 0) {
      setValue("grade_id", lessonDetails.grade_id);
      setValue("section_id", lessonDetails.section_id);
      setValue("subject_id", lessonDetails.subject_id);
      setValue("start_date", dayjs(lessonDetails.start_date));
      setValue("end_date", dayjs(lessonDetails.end_date));
      setValue("chapter_id", lessonDetails.chapter_id);
      setValue("topic_name", lessonDetails.topic_name);
      setValue("learning_objectives", lessonDetails.learning_objectives);
      setValue("teaching_methods", lessonDetails.teaching_methods);
      setValue("learning_outcome", lessonDetails.learning_outcome);
      setValue(
        "teaching_aid_references",
        lessonDetails.teaching_aid_references
      );
      setSelectedGradeId(lessonDetails.grade_id);
      lessonPlanMetadata(lessonDetails.grade_id, lessonDetails.section_id);
      setStartDate(dayjs(lessonDetails.start_date));
    }
  }, [lessonDetails, setValue]);

  useEffect(() => {
    getGradesList();
    getAllSubjectsData();
  }, []);

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

  const lessonPlanMetadata = (grade, section) => {
    if (grade && section) {
      setChaptersList([]);
      getLessonPlanMetadata(grade, section)
        .then((res) => {
          if (res.data && res.data.metadata && res.data.metadata.length > 0) {
            setChaptersList(res.data.metadata);
          }
        })
        .catch((err) => console.log("metadata err - "));
    }
  };

  const handleGradeChange = (e) => {
    setSelectedGradeId(e.target.value);
    setValue("grade_id", e.target.value);
    setValue("section_id", "");
    setValue("chapter_id", "");
    lessonPlanMetadata(e.target.value, getValues().section_id);
  };

  const handleSectionChange = (e) => {
    setValue("section_id", e.target.value);
    setValue("chapter_id", "");
    lessonPlanMetadata(getValues().grade_id, e.target.value);
  };

  const onSubmit = (data) => {
    let paylaod = { ...data };
    paylaod["teacher_id"] = userInfo.user_id;
    if (selectedLessonId > 0) {
      paylaod["lesson_id"] = selectedLessonId;
    }
    saveLessonPlan(paylaod)
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
    setValue("end_date", "");
    console.log("Start Date value changed to:", date);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedLessonId > 0 ? "Edit Lesson" : "Create New Lesson"}
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
                          onChange={(e) => {
                            onChange(e.target.value);
                            handleSectionChange(e);
                          }}
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
                  <TextField
                    fullWidth
                    label="Teacher Name"
                    disabled={true}
                    defaultValue={userInfo.name}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          minDate={
                            selectedLessonId > 0
                              ? dayjs(lessonDetails.start_date)
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

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="chapter_id"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <InputLabel error={!!error}>Chapter Number</InputLabel>
                        <Select
                          onChange={onChange}
                          value={value || ""}
                          error={!!error}
                        >
                          {chaptersList?.map((item) => (
                            <MenuItem
                              key={item.chapter_id}
                              value={item.chapter_id}
                            >
                              {item.chapter_id}
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
                    name="topic_name"
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
                        label="Topic Name"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="learning_objectives"
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
                        label="Learning Objective"
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
                    name="teaching_methods"
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
                        label="Teaching Methods"
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name="learning_outcome"
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
                        label="Learning Outcome"
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
                    name="teaching_aid_references"
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
                        label="Teaching Aids"
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
          message: `The lesson ${
            selectedLessonId > 0 ? "updation" : "creation"
          } ${showAlert === "success" ? "succeeded" : "failed"}.`,
        })}
    </React.Fragment>
  );
};

export default CreateLessonPlan;
