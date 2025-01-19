import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CreateAdmission from "./CreateAdmission";
import { deleteUserInfo, getAllEmployeesList } from "../../../ApiClient";
import BackButton from "../../../SharedComponents/BackButton";
import EmployeeCard from "../HRMS/EmployeeCard";
import AlertDialogSlide from "../HRMS/AlertDialogSlide";
import { showAlertMessage } from "../../AlertMessage";

const AdmissionView = () => {
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetching employees list with async/await for better readability
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await getAllEmployeesList({
          user_ids: [],
        });
        const employeeData = res?.data?.employee_data || [];
        setEmployees(employeeData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, [refreshView]);

  // Update selected filter based on URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeView = queryParams.get("activeView") || "all";
    setSelectedFilter(activeView);
  }, [location.search]);

  // Handling action with useCallback to prevent unnecessary re-renders
  const handleAction = useCallback((data, action) => {
    switch (action) {
      case "edit":
        setSelectedEmployeeDetails(data);
        setIsAddEmployeeModalVisible(true);
        break; // Using break instead of return for clarity

      case "delete":
        setSelectedEmployeeDetails(data);
        setIsOpenConfirmDialog(true);
        break; // Using break instead of return for clarity

      default:
        goToProfile(data);
    }
  }, []);

  const handleClose = (isSubmit) => {
    setIsAddEmployeeModalVisible(false);
    setSelectedEmployeeDetails(null);
    if (isSubmit) {
      // Debounce the refresh to avoid excessive rerenders
      setTimeout(() => setRefreshView((prev) => !prev), 500);
    }
  };

  // Handle filter change and update URL
  const handleFilterChange = (event, status) => {
    const filter = status || "all";
    setSelectedFilter(filter);
    navigate(`?activeView=${filter}`, { replace: true });
  };

  // Confirmation dialog
  const closeDialog = (isConfirmed) => {
    if (isConfirmed) {
      getDeleteEmployee();
    } else {
      setIsOpenConfirmDialog(false);
    }
  };

  // Filtering employees based on selected filter using useMemo
  const filteredEmployees = useMemo(() => {
    switch (selectedFilter) {
      case "new":
        const today = new Date();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(today.getMonth() - 3); // Changed to 3 months as per original logic
        return employees.filter((employee) => {
          const doj = new Date(employee.doj);
          return doj >= twoMonthsAgo && doj <= today;
        });
      case "active":
        return employees.filter((employee) => employee.is_active);
      case "inactive":
        return employees.filter((employee) => !employee.is_active);
      case "teaching":
        return employees.filter((employee) => employee.designationid === 3);
      case "nonteaching":
        return employees.filter((employee) => employee.designationid !== 3);
      default:
        return employees;
    }
  }, [employees, selectedFilter]);

  const getDeleteEmployee = () => {
    deleteUserInfo(selectedEmployeeDetails.employeecode)
      .then((res) => {
        setShowAlert(res?.data?.status === "success" ? "success" : "error");
        setTimeout(() => {
          setIsOpenConfirmDialog(false);
          setTimeout(() => {
            setRefreshView((prev) => !prev);
            setShowAlert("");
          }, 2000);
        }, 1000);
      })
      .catch(() => {
        setShowAlert("error");
        setTimeout(() => setShowAlert(""), 3000);
        setIsOpenConfirmDialog(false);
      });
  };

  const goToProfile = (userData) => {
    navigate(`/profile/${encodeURIComponent(userData.employeecode)}`);
  };

  return (
    <>
      <Grid container justifyContent="end" alignItems="center">
        <Button
          className="rounded-pill"
          variant="contained"
          onClick={() => handleAction({}, "edit")}
          color="warning"
        >
          + New Admission
        </Button>
      </Grid>
      <Grid container spacing={3} mt={1}>
        {isLoading ? (
          <Box className="d-flex justify-content-center align-items-center w-100 mt-5">
            <CircularProgress />
          </Box>
        ) : filteredEmployees && filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.employeecode}
              employee={employee}
              onAction={handleAction}
            />
          ))
        ) : (
          <Box className="d-flex w-100 justify-content-around mt-5 text-center text-danger">
            No data available
          </Box>
        )}
      </Grid>
      {isAddEmployeeModalVisible && (
        <CreateAdmission
          isOpen={isAddEmployeeModalVisible}
          handleClose={handleClose}
          selectedData={selectedEmployeeDetails}
        />
      )}

      {/* Confirmation Dialog */}
      <AlertDialogSlide
        isOpen={isOpenConfirmDialog}
        title={"Are You Sure?"}
        content={
          "This will permanently delete the employee's information from our records. Click 'Agree' to confirm."
        }
        onAgree={() => {
          closeDialog(true);
        }}
        onDisagree={() => {
          closeDialog();
        }}
      />

      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The employee deletion ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </>
  );
};

export default AdmissionView;
