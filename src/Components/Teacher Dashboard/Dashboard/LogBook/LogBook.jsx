import React, { useState, useMemo, useEffect } from "react";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import { getGradeDetails, getTeacherLogBook } from "../../../../ApiClient";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewLog from "./AddNewLog";
import Edit from "@mui/icons-material/Edit";

const LogBook = () => {
  const [logBookDetails, setLogBookDetails] = useState();
  const [gradeData, setGradeData] = useState([]);
  const [selectedLog, setSelectedLog] = useState({});
  const [isAddLogModalVisible, setIsAddLogModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTeacherLogBook()
      .then((res) => {
        setLogBookDetails(res?.data?.log_book_data || []);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [refreshTable]);

  const handleAddLog = () => {
    setSelectedLog({});
    setIsAddLogModalVisible(true);
  };

  const handleEditLog = (row) => {
    setSelectedLog(row);
    setIsAddLogModalVisible(true);
  };

  const handleClose = (isSubmit) => {
    setIsAddLogModalVisible(false);
    if(isSubmit){
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <Button variant="contained" className="py-3" onClick={handleAddLog}>
          <AddIcon />
        </Button>
      </Box>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "period",
        header: "Period",
      },
      {
        accessorKey: "subject_name",
        header: "Subject",
      },
      {
        accessorKey: "content_taught",
        header: "Content Taught",
      },
      {
        accessorKey: "home_work",
        header: "Homework",
      },
      {
        accessorKey: "primary_verification_status",
        header: "Status",
        accessorFn: (row) => (
          <div className="align-items-baseline d-flex justify-content-between">
            {row.primary_verification_status === true ? (
              <div className="fw-bold text-success">Verified</div>
            ) : row.primary_verification_status === false ? (
              <div className="fw-bold text-danger">Sent back</div>
            ) : (
              <div className="fw-bold">Review</div>
            )}
            {row.primary_verification_status !== true && (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className="me-2"
                onClick={() => {
                  handleEditLog(row);
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

  return (
    <div>
      <RenderTopToolbarCustomActions />
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={logBookDetails || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Log book</h1>
        )}
      />
      {isAddLogModalVisible && (
        <AddNewLog
          isOpen={isAddLogModalVisible}
          handleClose={handleClose}
          gradeData={gradeData}
          selectedLog={selectedLog}
        />
      )}
    </div>
  );
};

export default LogBook;
