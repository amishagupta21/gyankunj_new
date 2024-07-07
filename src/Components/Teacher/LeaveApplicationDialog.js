import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import {
  CircularProgress,
  DialogContentText,
  Typography,
  Alert,
} from "@mui/material";
import {
  evaluateLeaveApplication,
  getLeaveApplicationDetails,
} from "../../ApiClient";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LeaveApplicationDialog = ({
  isOpen,
  handleClose,
  selectedLeaveId = 0,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState("");
  const [leaveApplicationDetails, setLeaveApplicationDetails] = React.useState(
    {}
  );

  React.useEffect(() => {
    if (selectedLeaveId !== 0) {
      setIsLoading(true);
      getLeaveApplicationDetails(selectedLeaveId)
        .then((res) => {
          if (res?.data?.leave_data?.length > 0) {
            setLeaveApplicationDetails(res.data.leave_data[0]);
          } else {
            setLeaveApplicationDetails({
              leave_id: 1,
              leave_data: "This is a leave application",
              parent_id: "parent_2",
              student_id: "STUD_1",
              start_date: "2024-07-10",
              end_date: "2024-07-11",
              assigned_to: "TEACHER_1",
              no_of_days: 1,
              leave_type: "sick",
              grade_id: 1,
              section_id: 1,
            });
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [selectedLeaveId]);

  const takeActionOnLeave = (isApproved) => {
    const payload = {
      leave_id: selectedLeaveId,
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
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{ minWidth: { xs: "90%", sm: "500px" } }}
      >
        <DialogTitle>Leave Application Details</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <DialogContentText id="alert-dialog-slide-description">
              <CircularProgress color="primary" />
            </DialogContentText>
          ) : Object.keys(leaveApplicationDetails).length > 0 ? (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" marginY={1}>
                  <strong>Parent ID:</strong>{" "}
                  {leaveApplicationDetails.parent_id}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  <strong>Start Date:</strong>{" "}
                  {leaveApplicationDetails.start_date}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  <strong>Leave Type:</strong>{" "}
                  {leaveApplicationDetails.leave_type}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" marginY={1}>
                  <strong>Student ID:</strong>{" "}
                  {leaveApplicationDetails.student_id}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  <strong>End Date:</strong> {leaveApplicationDetails.end_date}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  <strong>No. of Days:</strong>{" "}
                  {leaveApplicationDetails.no_of_days}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" marginY={1}>
                  <strong>Leave Reason:</strong>{" "}
                  {leaveApplicationDetails.leave_data}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              No data available
            </DialogContentText>
          )}
        </DialogContent>
        {leaveApplicationDetails.status === "pending" && (
          <DialogActions>
            <Button variant="outlined" onClick={() => takeActionOnLeave(false)}>
              Reject
            </Button>
            <Button variant="contained" onClick={() => takeActionOnLeave(true)}>
              Approve
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {showAlert && (
        <Alert severity={showAlert === "success" ? "success" : "error"}>
          {showAlert === "success"
            ? "Action successfully performed"
            : "An error occurred"}
        </Alert>
      )}
    </>
  );
};

export default LeaveApplicationDialog;
