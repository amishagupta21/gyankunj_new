import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllEmployeesList, getTeacherLeaveApplicationsList } from "../ApiClient";

const ProfilePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [userDetails, setUserDetails] = useState(null);
  const [leavesData, setLeavesData] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingLeaves, setLoadingLeaves] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingProfile(true);
      try {
        const { data } = await getAllEmployeesList({ user_ids: [userInfo.user_id] });
        setUserDetails(data?.employee_data?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchLeaves = async () => {
      setLoadingLeaves(true);
      try {
        const { data } = await getTeacherLeaveApplicationsList(userInfo.user_id);
        setLeavesData([
          {
              "leave_id": 1,
              "leave_data": "This is a leave application",
              "parent_id": "6857683456",
              "student_id": "afs/1/01/2024",
              "start_date": "2024-10-28",
              "end_date": "2024-10-30",
              "assigned_to": "sfs/25/01/2024",
              "no_of_days": 3,
              "leave_type": "Casual Leave",
              "grade_id": 3,
              "section_id": 1,
              "is_approved": true,
              "is_withdrawn": true,
              "status": "withdrawn"
          },
          {
            "leave_id": 1,
            "leave_data": "This is a leave application",
            "parent_id": "6857683456",
            "student_id": "afs/1/01/2024",
            "start_date": "2024-10-28",
            "end_date": "2024-10-30",
            "assigned_to": "sfs/25/01/2024",
            "no_of_days": 3,
            "leave_type": "Casual Leave",
            "grade_id": 3,
            "section_id": 1,
            "is_approved": true,
            "is_withdrawn": true,
            "status": "withdrawn"
        }
      ]);
      } catch (error) {
        console.error("Failed to fetch leave data:", error);
      } finally {
        setLoadingLeaves(false);
      }
    };

    fetchEmployees();
    fetchLeaves();
  }, [userInfo.user_id]);

  const renderDataOrPlaceholder = (data) => data || "N/A";

  return (
    <Grid container spacing={3}>
      {/* User Profile Card */}
      <Grid item xs={12} sm={12} md={6}>
        <Card className="bg-body-tertiary rounded-4">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <hr />
            {loadingProfile ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : userDetails ? (
              <Grid container spacing={2}>
                {[
                  { label: "Name", value: userDetails.employeename },
                  { label: "Employee Code", value: userDetails.employeecode },
                  { label: "Phone", value: userDetails.phone },
                  { label: "Email", value: userDetails.email },
                  { label: "Date of Birth", value: userDetails.dob },
                  { label: "Date of Joining", value: userDetails.doj },
                  { label: "Gender", value: userDetails.gender },
                  { label: "Designation", value: userDetails.designationname },
                  { label: "Active", value: userDetails.is_active ? "Yes" : "No" },
                  { label: "Married", value: userDetails.is_married ? "Yes" : "No" },
                  { label: "Spouse's Name", value: userDetails.spousename },
                  { label: "Father's Name", value: userDetails.fathers_name },
                  { label: "PAN Number", value: userDetails.pancard },
                  { label: "Aadhaar Number", value: userDetails.aadharnumber },
                  { label: "Bank Account", value: userDetails.bankaccount },
                  { label: "Salary Scale", value: userDetails.salaryscale },
                  { label: "Highest Qualification", value: userDetails.highestqualification },
                  { label: "Country", value: userDetails.country },
                  { label: "License Number", value: userDetails.license_number },
                  { label: "License Expiry Date", value: userDetails.license_expiry_date },
                  { label: "Address", value: userDetails.address },
                ].map(({ label, value }) => (
                  <Grid item xs={12} md={6} key={label} display="flex" justifyContent="space-between">
                    <Typography variant="body1" color="textSecondary">{label}:</Typography>
                    <Typography variant="body1">{renderDataOrPlaceholder(value)}</Typography>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                Profile data not available.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Leave Details Card */}
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Leave Details
            </Typography>
            <hr />
            {loadingLeaves ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : leavesData.length ? (
              <Grid container spacing={2}>
                {leavesData.map((leave) => (
                  <Grid item xs={12} key={leave.leave_id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container spacing={2}>
                          {[
                            { label: "Leave ID", value: leave.leave_id },
                            { label: "Leave Application", value: leave.leave_data },
                            { label: "Parent ID", value: leave.parent_id },
                            { label: "Student ID", value: leave.student_id },
                            { label: "Start Date", value: leave.start_date },
                            { label: "End Date", value: leave.end_date },
                            { label: "Assigned To", value: leave.assigned_to },
                            { label: "Number of Days", value: leave.no_of_days },
                            { label: "Leave Type", value: leave.leave_type },
                            { label: "Grade ID", value: leave.grade_id },
                            { label: "Section ID", value: leave.section_id },
                            { label: "Approved", value: leave.is_approved !== null ? (leave.is_approved ? "Yes" : "No") : "Pending" },
                            { label: "Withdrawn", value: leave.is_withdrawn !== null ? (leave.is_withdrawn ? "Yes" : "No") : "Pending" },
                            { label: "Status", value: leave.status },
                          ].map(({ label, value }) => (
                            <Grid item xs={12} md={6} key={label} display="flex" justifyContent="space-between">
                              <Typography variant="body1" color="textSecondary">{label}:</Typography>
                              <Typography variant="body1">{renderDataOrPlaceholder(value)}</Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                Leave data not available.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
