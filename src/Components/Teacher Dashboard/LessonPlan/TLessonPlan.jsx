import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  getGradeDetails,
  getLessonPlan,
  getTeachersData,
  lessonPlanAllDetails,
  verifyLessonPlan,
} from "../../../ApiClient";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import AddIcon from "@mui/icons-material/Add";
import CreateLessonPlan from "./CreateLessonPlan";
import Edit from "@mui/icons-material/Edit";

const TLessonPlan = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [lessonPlanData, setLessonPlanData] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [isAddLessonModalVisible, setIsAddLessonModalVisible] = useState(false);

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
    getLessonPlan(userInfo.user_id)
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
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [refreshTable]);

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          className="py-3"
          onClick={() => setIsAddLessonModalVisible(true)}
        >
          <AddIcon />
        </Button>
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
        header: "Status",
        accessorFn: (row) => (
          <div className="align-items-baseline d-flex justify-content-between">
            {row.verified === true ? (
              <div className="fw-bold text-success">Verified</div>
            ) : row.verified === false ? (
              <div className="fw-bold text-danger">Sent back</div>
            ) : (
              <div className="fw-bold">Review</div>
            )}
            {row.verified !== true && (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className="me-2"
                onClick={() => {
                  handleEditLesson(row);
                }}
              >
                <Edit sx={{ fontSize: 16 }} />
                Edit
              </Button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const handleEditLesson = (row) => {
    setSelectedLessonId(row.lesson_id);
    setIsAddLessonModalVisible(true);
  };

  const handleClose = (isSubmit) => {
    setIsAddLessonModalVisible(false);
    setSelectedLessonId(0);
    if (isSubmit) {
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  return (
    <>
      <RenderTopToolbarCustomActions />
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={lessonPlanData || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Lesson Plan</h1>
        )}
        renderDetailPanel={(row) => (
          <CustomDetailPanel
            row={row}
            setRefreshTable={setRefreshTable}
            refreshTable={refreshTable}
          />
        )}
      />
      {isAddLessonModalVisible && (
        <CreateLessonPlan
          isOpen={isAddLessonModalVisible}
          handleClose={handleClose}
          selectedLessonId={selectedLessonId}
        />
      )}
    </>
  );
};

export default TLessonPlan;

const CustomDetailPanel = ({ row, setRefreshTable, refreshTable }) => {
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
        setRefreshTable(!refreshTable);
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
      {rowData.id &&
        rowData.verified !== false &&
        rowData.verified !== true && (
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
