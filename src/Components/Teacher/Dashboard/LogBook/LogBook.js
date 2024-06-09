import React, { useState, useMemo, useEffect } from "react";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import { getTeacherLogBook } from "../../../../ApiClient";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import CreateLogBook from "./CreateLogBook";

const LogBook = () => {
  const [logBookDetails, setLogBookDetails] = useState();
  const [selectedLog, setSelectedLog] = useState({});
  const [isAddLogModalVisible, setIsAddLogModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

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
    if (isSubmit) {
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
          <AddIcon /> Create log book
        </Button>
      </Box>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "period_id",
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
            {row.secondary_verification_status === null &&
              row.primary_verification_status === null && (
                <div className="fw-bold">Under Review</div>
              )}
            {row.secondary_verification_status === null &&
              row.primary_verification_status === true && (
                <div className="fw-bold">Under Review</div>
              )}
            {row.secondary_verification_status === null &&
              row.primary_verification_status === false && (
                <div className="fw-bold text-danger">Sent back</div>
              )}
            {row.secondary_verification_status === false &&
              row.primary_verification_status === true && (
                <div className="fw-bold text-danger">Sent back</div>
              )}
            {row.secondary_verification_status === true &&
              row.primary_verification_status === true && (
                <div className="fw-bold text-success">Verified</div>
              )}

            {(row.secondary_verification_status === false ||
              row.primary_verification_status === false) && (
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
        <CreateLogBook
          isOpen={isAddLogModalVisible}
          handleClose={handleClose}
          selectedLog={selectedLog}
        />
      )}
    </div>
  );
};

export default LogBook;
