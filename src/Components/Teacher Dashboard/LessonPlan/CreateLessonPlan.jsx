import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
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
  },
}));

const CreateLessonPlan = ({ isOpen, handleClose, selectedLessonId = 0 }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
    trigger,
    setFocus,
  } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [selectedGradeId, setSelectedGradeId] = useState(0);
  const [lessonDetails, setLessonDetails] = useState({});
  const [gradeData, setGradeData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);
  const [showAlert, setShowAlert] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (selectedLessonId > 0) {
      lessonPlanAllDetails(selectedLessonId)
        .then((res) => {
          if (
            res?.data?.lesson_plan_data &&
            res?.data?.lesson_plan_data.length > 0
          ) {
            setLessonDetails(res.data.lesson_plan_data[0]);
            setValue("grade_id", 1);
            setValue("section_id", "1");
            setValue("subject_id", 4);
            setValue("start_date", "2024-04-23");
            setValue("end_date", "2024-04-24");
            setValue("chapter_id", 1);
            setValue("topic_name", "Topic test 2");
            setValue("learning_objectives", "Learning Objective 2");
            setValue("teaching_methods", "Teaching Methods 2");
            setValue("learning_outcome", "Learning Outcome 2");
            setValue("teaching_aid_references", "Teaching Aids 2");
            // setValue("teacher_id", "teacher");
            setSelectedGradeId(1);
            lessonPlanMetadata(1, "1");
            setStartDate(dayjs("2024-04-23"));
            setEndDate(dayjs("2024-04-24"));

            setFocus();
          }
        })
        .catch((err) => console.log("Lesson err - ", err));
    }
  }, []);

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
    trigger("grade_id");
  };

  const handleSectionChange = (e) => {
    setValue("section_id", e.target.value);
    setValue("chapter_id", "");
    lessonPlanMetadata(getValues().grade_id, e.target.value);
    trigger("section_id");
  };

  const handleSubjectChange = (e) => {
    setValue("subject_id", e.target.value);
    trigger("subject_id");
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("start_date", dayjs(date).format("YYYY-MM-DD"));
    trigger("start_date");
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("end_date", dayjs(date).format("YYYY-MM-DD"));
    trigger("end_date");
  };

  const handleChapterChange = (e) => {
    setValue("chapter_id", e.target.value);
    trigger("chapter_id");
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

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedLessonId > 0 ? "Edit Lesson" : "Create New Lesson"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
                  <InputLabel>Grade</InputLabel>
                  <Select
                    {...register("grade_id", { required: true })}
                    onChange={handleGradeChange}
                    value={getValues()?.grade_id ?? ""}
                  >
                    {gradeData?.map((item) => (
                      <MenuItem key={item.grade_id} value={item.grade_id}>
                        {item.grade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.grade_id && (
                  <p className="text-danger">Grade is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>
                  <Select
                    {...register("section_id", { required: true })}
                    onChange={handleSectionChange}
                    value={getValues()?.section_id ?? ""}
                  >
                    {selectedGradeId && gradeData
                      ? gradeData
                          .find((grade) => grade.grade_id === selectedGradeId)
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
                </FormControl>
                {errors.section_id && (
                  <p className="text-danger">Section is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    {...register("subject_id", { required: true })}
                    onChange={handleSubjectChange}
                    value={getValues()?.subject_id ?? ""}
                  >
                    {subjectsList?.map((item) => (
                      <MenuItem key={item.subject_id} value={item.subject_id}>
                        {item.subject_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.subject_id && (
                  <p className="text-danger">Subject is required</p>
                )}
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
                  <LocalizationProvider
                    {...register("start_date", { required: true })}
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      value={startDate}
                      maxDate={endDate}
                      minDate={dayjs()}
                      onChange={handleStartDateChange}
                    />
                  </LocalizationProvider>
                </FormControl>
                {errors.start_date && (
                  <p className="text-danger">Start Date is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <LocalizationProvider
                    {...register("end_date", { required: true })}
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      minDate={startDate ?? dayjs()}
                      format="YYYY-MM-DD"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </LocalizationProvider>
                </FormControl>
                {errors.end_date && (
                  <p className="text-danger">End Date is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Chapter Number</InputLabel>
                  <Select
                    {...register("chapter_id", { required: true })}
                    onChange={handleChapterChange}
                    value={getValues()?.chapter_id ?? ""}
                  >
                    {chaptersList?.map((item) => (
                      <MenuItem key={item.chapter_id} value={item.chapter_id}>
                        {item.chapter_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.chapter_id && (
                  <p className="text-danger">Chapter is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Topic Name"
                    {...register("topic_name", { required: true })}
                  />
                </FormControl>
                {errors.topic_name && (
                  <p className="text-danger">Topic is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Learning Objective"
                  multiline
                  rows={3}
                  {...register("learning_objectives", { required: true })}
                />
                {errors.learning_objectives && (
                  <p className="text-danger">Learning Objective is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teaching Methods"
                  multiline
                  rows={3}
                  {...register("teaching_methods", { required: true })}
                />
                {errors.teaching_methods && (
                  <p className="text-danger">Teaching Methods is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Learning Outcome"
                  multiline
                  rows={3}
                  {...register("learning_outcome", { required: true })}
                />
                {errors.learning_outcome && (
                  <p className="text-danger">Learning Outcome is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teaching Aids"
                  multiline
                  rows={3}
                  {...register("teaching_aid_references", { required: true })}
                />
                {errors.teaching_aid_references && (
                  <p className="text-danger">Teaching Aids is required</p>
                )}
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
                setEndDate(null);
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
