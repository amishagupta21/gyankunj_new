import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import { Form, Modal } from "react-bootstrap";
import { createLogBook, editLogBook, getSubjectsList } from "../../../../ApiClient";
import dayjs from "dayjs";
import { showAlertMessage } from "../../../AlertMessage";

const AddNewLog = ({
  isOpen,
  handleClose,
  gradeData = [],
  selectedLog = {},
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedGradeId, setSelectedGradeId] = useState(0);
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
    if (selectedLog && Object.keys(selectedLog).length > 0) {
      setIsEditMode(true);
      const {
        grade_id,
        section_id,
        period,
        subject_id,
        content_taught,
        home_work
      } = selectedLog;
    
      setValue("grade", grade_id);
      setValue("section", section_id);
      setValue("period", period);
      setValue("subject", subject_id);
      setValue("contentTaught", content_taught);
      setValue("homework", home_work);
     setSelectedGradeId(selectedLog.grade_id);
    }
    getAllSubjectsData();
  }, [setValue, selectedLog]);

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
    if(isEditMode){
      editLog(data);
    }
    else{
      addNewLog(data);
    }
  }

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
      home_work: data.homework
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
    setSelectedGradeId(grade);
    // Reset section value when grade changes
    setValue("section", "");
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit log" : "Add new log"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    disabled={isEditMode}
                    defaultValue={selectedLogBookData?.grade_id}
                    {...register("grade", { required: true })}
                    onChange={(e) => handleGradeChange(e.target.value)}
                  >
                    {gradeData?.map((item) => (
                      <MenuItem key={item.grade_id} value={item.grade_id}>
                        {item.grade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.grade && (
                  <p className="text-danger">Grade is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>
                  <Select
                    disabled={!selectedGradeId || isEditMode}
                    defaultValue={selectedLogBookData?.section_id}
                    {...register("section", { required: true })}
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
                {errors.section && (
                  <p className="text-danger">Section is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    disabled={isEditMode}
                    defaultValue={selectedLogBookData?.subject_id}
                    {...register("subject", { required: true })}
                  >
                    {subjectsList?.map((item) => (
                      <MenuItem key={item.subject_id} value={item.subject_id}>
                        {item.subject_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.subject && (
                  <p className="text-danger">Subject is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Period</InputLabel>
                  <Select
                    disabled={isEditMode}
                    defaultValue={selectedLogBookData?.period}
                    {...register("period", { required: true })}
                  >
                    {periodsList?.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.period && (
                  <p className="text-danger">Period is required</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Content Taught"
                  multiline
                  rows={3}
                  defaultValue={selectedLogBookData?.content_taught}
                  {...register("contentTaught", { required: true })}
                />
                {errors.contentTaught && (
                  <p className="text-danger">Content Taught is required</p>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Homework"
                  multiline
                  rows={3}
                  defaultValue={selectedLogBookData?.home_work}
                  {...register("homework", { required: true })}
                />
                {errors.homework && (
                  <p className="text-danger">Homework is required</p>
                )}
              </Grid>
            </Grid>

            <div className="text-end mt-4">
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
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The log book ${isEditMode ? 'updation': 'creation'} ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </>
  );
};

export default AddNewLog;
