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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import { Form } from "react-bootstrap";
import {
  createLogBook,
  editLogBook,
  getGradeDetails,
  getSubjectsList,
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

const CreateLessonPlan = ({ isOpen, handleClose, selectedLog = {} }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedGradeId, setSelectedGradeId] = useState(0);
  const [gradeData, setGradeData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectedLogBookData, setSelectedLogBookData] = useState(selectedLog);
  const [showAlert, setShowAlert] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = JSON.parse(localStorage.getItem("UserData"))?.user_id;
  const periodsList = [
    { value: "1", label: 1 },
    { value: "2", label: 2 },
    { value: "3", label: 3 },
    { value: "4", label: 4 },
    { value: "5", label: 5 },
    { value: "6", label: 6 },
    { value: "7", label: 7 },
    { value: "8", label: 8 },
  ];

  useEffect(() => {
    getGradesList();
    getAllSubjectsData();
    //setValue("start_date", dayjs())
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

  const onSubmit = (data) => {
    if (isEditMode) {
      editLog(data);
    } else {
      addNewLog(data);
    }
  };

  const addNewLog = (data) => {
    const payload = {
      grade_id: data.grade,
      section_id: parseInt(data.section),
      period: data.period,
      subject_id: data.subject,
      teacher_id: userId,
      content_taught: data.contentTaught,
      home_work: data.homework,
      date: dayjs().format("YYYY-MM-DD"),
    };
    console.log(data);
    createLogBook(payload)
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

  const editLog = (data) => {
    const payload = {
      log_book_id: selectedLog.log_book_id,
      content_taught: data.contentTaught,
      home_work: data.homework,
    };
    console.log(data);
    editLogBook(payload)
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

  const handleGradeChange = (grade) => {
    setSelectedGradeId(0);
    setTimeout(() => {
      setSelectedGradeId(grade);
    }, 1000);
    // Reset section value when grade changes
    setValue("section_id", 0);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Lesson
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
                    onChange={(e) => handleGradeChange(e.target.value)}
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
                    onChange={(e) => console.log('section_id',e.target.value)}
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
                  <Select {...register("subject_id", { required: true })}>
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
                    {...register("teacher_id", { required: true })}
                  />
                </FormControl>
                {errors.teacher_id && (
                  <p className="text-danger">Teacher is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...register("start_date", { required: true })}
                      format="YYYY-MM-DD"
                      // onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </FormControl>
                {errors.start_date && (
                  <p className="text-danger">Start Date is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...register("end_date", { required: true })}
                      format="YYYY-MM-DD"
                      //value={dateFilter}
                      // onChange={handleDateChange}
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
                  <Select {...register("chapter_id", { required: true })}>
                    {periodsList?.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
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
    </>
  );
};

export default CreateLessonPlan;
