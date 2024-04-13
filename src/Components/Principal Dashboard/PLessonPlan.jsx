import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  div,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getGradeDetails,
  getLessonPlan,
  getTeachersData,
  lessonPlanAllDetails,
  verifyLessonPlan,
} from "../../ApiClient";
import CommonMatTable from "../../SharedComponents/CommonMatTable";
import TLessonPlan from "./Lesson Plan/LessonPlan";

const PLessonPlan = () => {
  const [lessonPlanData, setLessonPlanData] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTeachersData()
      .then((res) => {
        setTeachersList([]);
        if (res?.data?.teachers && res?.data?.teachers.length > 0) {
          setTeachersList(res?.data?.teachers);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getLessonPlan(teacherFilter)
      .then((res) => {
        setLessonPlanData([]);
        if (
          res?.data?.lesson_plan_data &&
          res?.data?.lesson_plan_data.length > 0
        ) {
          setLessonPlanData(res?.data?.lesson_plan_data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [teacherFilter]);

  const handleTeacherChange = (event) => {
    setTeacherFilter(event.target.value);
  };

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="teacher-filter-label">Teacher</InputLabel>
          <Select
            labelId="teacher-filter-label"
            value={teacherFilter || ""}
            onChange={handleTeacherChange}
          >
            {teachersList.map((item) => (
              <MenuItem key={item.teacher_id} value={item.teacher_id}>
                {item.teacher_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      { accessorKey: "grade", header: "Grade" },
      { accessorKey: "subject_name", header: "Subject" },
      { accessorKey: "topic_name", header: "Lesson" },
      {
        accessorFn: (row) => (
          <div className={`fw-bold ${row.verified === true ? "text-success" : row.verified === false ? "text-danger": ""}`}>{row.verified === true ? "Verified" : row.verified === false ? "Sent back": "Review"}</div>
        ),
        header: "Status",
      },
    ],
    []
  );

  return (
    <div className="py-5 px-4">
      <RenderTopToolbarCustomActions />
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={lessonPlanData || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Lesson Plan</h1>
        )}
        renderDetailPanel={(row) => <CustomDetailPanel row={row} />}
      />
      {/* <TLessonPlan /> */}
    </div>
  );
};

export default PLessonPlan;

const CustomDetailPanel = ({ row }) => {
  const [rowData, setRowData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (row.row.getIsExpanded()) {
      lessonPlanAllDetails(row.row.original.lesson_id)
        .then((res) => {
          if (
            res?.data?.lesson_plan_data &&
            res?.data?.lesson_plan_data.length > 0
          ) {
            setRowData(res.data.lesson_plan_data[0]);
          }
        })
        .catch((err) => console.log("Lesson err - ", err));
    }
  }, [row]);

  const approveLessonPlan = (isVerified, comment) => {
    const dataToVerify = {
      lesson_id: row.row.original.lesson_id,
      verified: isVerified,
      reviewers_message: !isVerified ? comment : undefined,
    };

    verifyLessonPlan(dataToVerify)
      .then((res) => {
        console.log("Verified - ", res.data);

        lessonPlanAllDetails(row.row.original.lesson_id)
          .then((res) => {
            if (
              res?.data?.lesson_plan_data &&
              res?.data?.lesson_plan_data.length > 0
            ) {
              setRowData(res.data.lesson_plan_data[0]);
            }
          })
          .catch((err) => console.log("Lesson err - ", err));
      })
      .catch((err) => console.log("Not Verified"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="fw-bold">Topic Name: </div>
          </Grid>
          <Grid item xs={9}>
            <div>{rowData.topic_name}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="fw-bold">Learning Objective: </div>
          </Grid>
          <Grid item xs={9}>
            <div>{rowData.learning_objectives}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="fw-bold">Teaching Methods: </div>
          </Grid>
          <Grid item xs={9}>
            <div>{rowData.teaching_methods}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="fw-bold">Learning Outcome: </div>
          </Grid>
          <Grid item xs={9}>
            <div>{rowData.learning_outcome}</div>
          </Grid>
          <Grid item xs={3}>
            <div className="fw-bold">Teaching Aids: </div>
          </Grid>
          <Grid item xs={9}>
            <div>{rowData.teaching_aid_references}</div>
          </Grid>
        </Grid>
      </CardContent>
      {rowData.verified !== false && rowData.verified !== true && (
        <CardActions>
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={() => approveLessonPlan(true)}
          >
            Approve
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleClickOpen}
          >
            Reject
          </Button>
        </CardActions>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const comment = formJson.comment;
            approveLessonPlan(false, comment);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reject this lesson plan, please enter your comment here. We will
            send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            rows={3}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Reject</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
