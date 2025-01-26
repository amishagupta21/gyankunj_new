import React, { useEffect, useState, useMemo, useCallback } from "react";
import EmployeeCard from "./EmployeeCard";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import BackButton from "../../../SharedComponents/BackButton";
import CreateEmployee from "./CreateEmployee";
import { deleteUserInfo, getUsersList } from "../../../ApiClient";
import { useNavigate, useLocation } from "react-router-dom";
import AlertDialogSlide from "./AlertDialogSlide";
import { showAlertMessage } from "../../AlertMessage";

const EmployeesList = () => {
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] =
    useState(false);
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
        const res = await getUsersList({
            "user_ids": [],
            "role_id": 6
        });
        const userData = res?.data?.user_data || [];
        setEmployees(userData);
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
          const date_of_joining = new Date(employee.date_of_joining);
          return date_of_joining >= twoMonthsAgo && date_of_joining <= today;
        });
      case "active":
        return employees.filter((employee) => employee.is_active);
      case "inactive":
        return employees.filter((employee) => !employee.is_active);
      case "teaching":
        return employees.filter((employee) => employee.role_id === 3);
      case "nonteaching":
        return employees.filter((employee) => employee.role_id !== 3);
      default:
        return employees;
    }
  }, [employees, selectedFilter]);

  const getDeleteEmployee = () => {
    deleteUserInfo(selectedEmployeeDetails.user_id)
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
    navigate(`/profile/${encodeURIComponent(userData.user_id)}/${encodeURIComponent(userData.role_id)}`);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <BackButton />
        <ToggleButtonGroup
          color="primary"
          value={selectedFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label="Employee Filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="new">New</ToggleButton>
          <ToggleButton value="teaching">Teaching</ToggleButton>
          <ToggleButton value="nonteaching">Non-Teaching</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="inactive">In-Active</ToggleButton>
        </ToggleButtonGroup>
        <Button
          className="rounded-pill"
          variant="contained"
          onClick={() => handleAction({}, "edit")}
          color="warning"
        >
          + Add Employee
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
              key={employee.user_id}
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
        <CreateEmployee
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

export default EmployeesList;
