import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllEmployeesList } from "../ApiClient";
import PaFeedback from "./Parent/PaFeedback";
import BackButton from "../SharedComponents/BackButton";

const ProfileInfoField = ({ label, value }) => (
  <Grid item xs={12} md={6} display="flex" justifyContent="space-between">
    <Typography variant="body1" color="textSecondary">
      {label}:
    </Typography>
    <Typography variant="body1">{value || "N/A"}</Typography>
  </Grid>
);

const ProfilePage = () => {
  const userInfo = useMemo(
    () => JSON.parse(localStorage.getItem("UserData")),
    []
  );
  const [userDetails, setUserDetails] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const { data } = await getAllEmployeesList({
        user_ids: [userInfo.user_id],
      });
      setUserDetails(data?.employee_data?.[0] || null);
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, [userInfo.user_id]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const userProfileFields = [
    { label: "Name", value: userDetails?.employeename },
    { label: "Employee Code", value: userDetails?.employeecode },
    { label: "Phone", value: userDetails?.phone },
    { label: "Email", value: userDetails?.email },
    { label: "Date of Birth", value: userDetails?.dob },
    { label: "Date of Joining", value: userDetails?.doj },
    { label: "Gender", value: userDetails?.gender },
    { label: "Designation", value: userDetails?.designationname },
    { label: "Active", value: userDetails?.is_active ? "Yes" : "No" },
    { label: "Married", value: userDetails?.is_married ? "Yes" : "No" },
    { label: "Spouse's Name", value: userDetails?.spousename },
    { label: "Father's Name", value: userDetails?.fathers_name },
    { label: "PAN Number", value: userDetails?.pancard },
    { label: "Aadhaar Number", value: userDetails?.aadharnumber },
    { label: "Bank Account", value: userDetails?.bankaccount },
    { label: "Salary Scale", value: userDetails?.salaryscale },
    {
      label: "Highest Qualification",
      value: userDetails?.highestqualification,
    },
    { label: "Country", value: userDetails?.country },
    { label: "License Number", value: userDetails?.license_number },
    { label: "License Expiry Date", value: userDetails?.license_expiry_date },
    { label: "Address", value: userDetails?.address },
  ];

  return (
    <>
    <BackButton />
      <Card className="bg-body-tertiary rounded-4 mb-5">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <hr />
          {loadingProfile ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : userDetails ? (
            <Grid container spacing={2}>
              {userProfileFields.map(({ label, value }) => (
                <ProfileInfoField key={label} label={label} value={value} />
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              Profile data not available.
            </Typography>
          )}
        </CardContent>
      </Card>
      {userInfo.role !== "PARENT" && userInfo.role !== "STUDENT" && <PaFeedback isComingFromProfile={true} />}
    </>
  );
};

export default ProfilePage;
