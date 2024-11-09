import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllEmployeesList } from "../ApiClient";

const employeeData = {
  employeecode: "sfs/27/01/2024",
  employeename: "Chanchal Sen",
  phone: null,
  email: null,
  dob: "1990-04-01",
  doj: "2024-08-01",
  gender: "Male",
  designationid: 3,
  designationname: "Teacher",
  is_active: true,
  is_married: null,
  highestqualification: null,
  pancard: null,
  aadharnumber: null,
  bankaccount: null,
  salaryscale: null,
  address: null,
  spousename: null,
  country: "India",
  fathers_name: null,
  license_number: null,
  license_expiry_date: null,
};

const ProfilePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await getAllEmployeesList({
          user_ids: [userInfo.user_id],
        });
        const userData =
          res?.data?.employee_data?.length > 0 ? res.data.employee_data[0] : {};
        setUserDetails(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-5">
      <Card>
        {isLoading ? (
          <Box className="d-flex justify-content-center align-items-center w-100 p-5">
            <CircularProgress />
          </Box>
        ) : (
          <CardContent>
            <Typography variant="h5" className="mb-4">
              User Profile
            </Typography>
            <hr />
            <Grid container spacing={3}>
              {/* Name */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Name:
                </Typography>
                <Typography variant="body1">
                  {userDetails.employeename}
                </Typography>
              </Grid>

              {/* Employee Code */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Employee Code:
                </Typography>
                <Typography variant="body1">
                  {userDetails.employeecode}
                </Typography>
              </Grid>

              {/* Phone */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Phone:
                </Typography>
                <Typography variant="body1">
                  {userDetails.phone || "N/A"}
                </Typography>
              </Grid>

              {/* Email */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">
                  {userDetails.email || "N/A"}
                </Typography>
              </Grid>

              {/* Date of Birth */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Date of Birth:
                </Typography>
                <Typography variant="body1">{userDetails.dob}</Typography>
              </Grid>

              {/* Date of Joining */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Date of Joining:
                </Typography>
                <Typography variant="body1">{userDetails.doj}</Typography>
              </Grid>

              {/* Gender */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Gender:
                </Typography>
                <Typography variant="body1">{userDetails.gender}</Typography>
              </Grid>

              {/* Designation */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Designation:
                </Typography>
                <Typography variant="body1">
                  {userDetails.designationname}
                </Typography>
              </Grid>

              {/* Active Status */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Active:
                </Typography>
                <Typography variant="body1">
                  {userDetails.is_active ? "Yes" : "No"}
                </Typography>
                {/* <Switch checked={userDetails.is_active} disabled /> */}
              </Grid>

              {/* Marital Status */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Married:
                </Typography>
                <Typography variant="body1">
                  {userDetails.is_married ? "Yes" : "No"}
                </Typography>
              </Grid>

              {/* Spouse's Name */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Spouse's Name:
                </Typography>
                <Typography variant="body1">
                  {userDetails.spousename || "N/A"}
                </Typography>
              </Grid>

              {/* Father's Name */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Father's Name:
                </Typography>
                <Typography variant="body1">
                  {userDetails.fathers_name || "N/A"}
                </Typography>
              </Grid>

              {/* PAN Card */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  PAN Number:
                </Typography>
                <Typography variant="body1">
                  {userDetails.pancard || "N/A"}
                </Typography>
              </Grid>

              {/* Aadhaar Number */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Aadhaar Number:
                </Typography>
                <Typography variant="body1">
                  {userDetails.aadharnumber || "N/A"}
                </Typography>
              </Grid>

              {/* Bank Account */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Bank Account:
                </Typography>
                <Typography variant="body1">
                  {userDetails.bankaccount || "N/A"}
                </Typography>
              </Grid>

              {/* Salary Scale */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Salary Scale:
                </Typography>
                <Typography variant="body1">
                  {userDetails.salaryscale || "N/A"}
                </Typography>
              </Grid>

              {/* Highest Qualification */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Highest Qualification:
                </Typography>
                <Typography variant="body1">
                  {userDetails.highestqualification || "N/A"}
                </Typography>
              </Grid>

              {/* Country */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  Country:
                </Typography>
                <Typography variant="body1">{userDetails.country}</Typography>
              </Grid>

              {/* Address */}
              <Grid className="d-flex justify-content-between" item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Address:
                </Typography>
                <Typography variant="body1">
                  {userDetails.address || "N/A"}
                </Typography>
              </Grid>

              {/* License Number */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  License Number:
                </Typography>
                <Typography variant="body1">
                  {userDetails.license_number || "N/A"}
                </Typography>
              </Grid>

              {/* License Expiry Date */}
              <Grid
                className="d-flex justify-content-between"
                item
                xs={12}
                md={6}
              >
                <Typography variant="body1" color="textSecondary">
                  License Expiry Date:
                </Typography>
                <Typography variant="body1">
                  {userDetails.license_expiry_date || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
