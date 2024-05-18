import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { getLessonPlan, lessonPlanAllDetails } from "../../../ApiClient";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import AddIcon from "@mui/icons-material/Add";
import CreateLessonPlan from "./CreateLessonPlan";
import Edit from "@mui/icons-material/Edit";

const TLessonPlan = () => {
  //const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [lessonPlanData, setLessonPlanData] = useState([]);
  const [userInfo] = useState(JSON.parse(localStorage.getItem("UserData")));
  const [selectedLessonId, setSelectedLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [isAddLessonModalVisible, setIsAddLessonModalVisible] = useState(false);

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
  }, [userInfo]);

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
        renderDetailPanel={(row) => <CustomDetailPanel row={row} />}
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

const CustomDetailPanel = ({ row }) => {
  const [rowData, setRowData] = useState({});

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
    </Card>
  );
};
