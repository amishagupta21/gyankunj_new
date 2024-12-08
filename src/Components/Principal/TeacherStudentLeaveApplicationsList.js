import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Box,
} from "@mui/material";
import { evaluateLeaveApplication, getStaffLeaveApplicationsList } from "../../ApiClient";
import CommonMatTable from "../../SharedComponents/CommonMatTable";

const TeacherStudentLeaveApplicationsList = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [teacherLeaves, setTeacherLeaves] = useState([]);
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    leaveId: null,
    isApproved: null,
  });

  useEffect(() => {
    setIsLoading(true);
    getStaffLeaveApplicationsList()
      .then((res) => {
        const leaves = res?.data?.leave_data || [];
        setTeacherLeaves(leaves.filter((leave) => !leave.parent_id));
        setStudentLeaves(leaves.filter((leave) => leave.parent_id));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [refreshTable, userInfo.user_id]);

  const takeActionOnLeave = (leaveId, isApproved) => {
    const payload = {
      leave_id: leaveId,
      is_approved: isApproved,
    };
    evaluateLeaveApplication(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          setShowAlert("");
        }, 2000);
        setRefreshTable((prev) => !prev);
      })
      .catch((err) => {
        setShowAlert("error");
        setTimeout(() => {
          setShowAlert("");
        }, 3000);
      });
    closeConfirmationDialog();
  };

  const openConfirmationDialog = (leaveId, isApproved) => {
    setConfirmationDialog({ open: true, leaveId, isApproved });
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({ open: false, leaveId: null, isApproved: null });
  };

  const accessorFn = (row) => {
    const getStatusClass = (status) => {
      switch (status) {
        case "approved":
          return "text-success";
        case "withdrawn":
        case "rejected":
          return "text-danger";
        default:
          return "";
      }
    };

    return (
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div className={`fw-bold ${getStatusClass(row.status)}`}>
          {row.status}
        </div>
        {row.status === "pending" && (
          <Box className="d-flex gap-2 mt-1"> 
            <Button
              variant="outlined"
              color="error"
              onClick={() => openConfirmationDialog(row.leave_id, false)}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => openConfirmationDialog(row.leave_id, true)}
            >
              Approve
            </Button>
          </Box>
        )}
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "start_date",
        header: "Start date",
      },
      {
        accessorKey: "end_date",
        header: "End date",
      },
      {
        accessorKey: "no_of_days",
        header: "No of days",
      },
      {
        accessorKey: "leave_type",
        header: "Leave type",
      },
      {
        accessorKey: "leave_data",
        header: "Leave Reason",
      },
      {
        accessorKey: "is_approved",
        header: "Status",
        accessorFn: (row) => accessorFn(row),
      },
    ],
    []
  );

  return (
    <>
      <div className="mt-5">
        <CommonMatTable
          columns={columns}
          isLoading={isLoading}
          data={teacherLeaves}
          renderTopToolbar={() => (
            <h1 style={{ fontSize: 18, marginTop: 10 }}>Teacher Leave Applications</h1>
          )}
        />
      </div>
      <div className="mt-5">
        <CommonMatTable
          columns={columns}
          isLoading={isLoading}
          data={studentLeaves}
          renderTopToolbar={() => (
            <h1 style={{ fontSize: 18, marginTop: 10 }}>Student Leave Applications</h1>
          )}
        />
      </div>
      {showAlert && (
        <Alert severity={showAlert === "success" ? "success" : "error"}>
          {showAlert === "success"
            ? "Action successfully performed"
            : "An error occurred"}
        </Alert>
      )}
      <Dialog open={confirmationDialog.open} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {confirmationDialog.isApproved ? "approve" : "reject"} this leave
            application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              takeActionOnLeave(
                confirmationDialog.leaveId,
                confirmationDialog.isApproved
              )
            }
            color={confirmationDialog.isApproved ? "success" : "error"}
          >
            {confirmationDialog.isApproved ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeacherStudentLeaveApplicationsList;
