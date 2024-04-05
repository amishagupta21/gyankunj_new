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
import { createLogBook, getSubjectsList } from "../../../ApiClient";
import dayjs from "dayjs";

const AddNewLog = ({ isOpen, handleClose, gradeList = [] }) => {
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
  const userId = JSON.parse(localStorage.getItem("UserData"))?.user_id;
  const periodsList = [
    {value: "1", label: 1},
   {value: "2", label: 2},
   {value: "3", label: 3},
   {value: "4", label: 4},
   {value: "5", label: 5},
   {value: "6", label: 6},
   {value: "7", label: 7},
   {value: "8", label: 8}
  ]
  useEffect(() => {
    getAllSubjectsData();
  }, []);

  const getAllSubjectsData = () => {
    getSubjectsList()
      .then((res) => {
        setSubjectsList([]);
        if(res.data && res.data.subjects && res.data.subjects.length > 0){
            setSubjectsList(res.data.subjects);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    const payload = {
        "grade_id": data.grade,
        "section_id": parseInt(data.section),
        "period": data.period,
        "subject_id": data.subject,
        "teacher_id": userId,
        "content_taught": data.contentTaught,
        "home_work": data.homework,
        "date": dayjs().format("YYYY-MM-DD")
    }
    console.log(data);
    createLogBook(payload)
    .then((res) => {
        console.log(res.message, res.data);
        alert(res.message);
    })
    .catch((err) => console.log("Logbook Error - ", err))
    handleClose();
    reset();
  };

  const handleGradeChange = (e) => {
    setSelectedGradeId(e.target.value);
    // Reset section value when grade changes
    setValue("section", "");
  };

  return (
    <Modal show={isOpen} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new log</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} className="mb-4">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select
                  {...register("grade", { required: true })}
                  onChange={handleGradeChange}
                >
                  {gradeList?.map((item) => (
                    <MenuItem key={item.grade_id} value={item.grade_id}>
                      {item.grade_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.grade && <p className="text-danger">Grade is required</p>}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select
                  disabled={!selectedGradeId}
                  {...register("section", { required: true })}
                >
                  {selectedGradeId && gradeList
                    ? gradeList
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
                  {...register("subject", { required: true })}
                  onChange={handleGradeChange}
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
                  {...register("period", { required: true })}
                  onChange={handleGradeChange}
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
              type="reset"
              onClick={() => reset()}
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
  );
};

export default AddNewLog;
