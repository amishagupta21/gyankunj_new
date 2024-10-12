import React, { useEffect, useState, useMemo, useCallback } from "react";
import EmployeeCard from "./EmployeeCard";
import { Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import BackButton from "../../../SharedComponents/BackButton";
import CreateEmployee from "./CreateEmployee";
import { getAllEmployeesList } from "../../../ApiClient";

const EmployeeList = () => {
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [employees, setEmployees] = useState([
    {
        "id": "Teacher_06",
        "first_name": "Devanshu",
        "middle_name": "kumar",
        "last_name": "Shekhar",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-10-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_01",
        "first_name": "Sourabh",
        "middle_name": "",
        "last_name": "sen",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_02",
        "first_name": "Anup",
        "middle_name": "",
        "last_name": "Srivastav",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_03",
        "first_name": "Aakash",
        "middle_name": "",
        "last_name": "shrama",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_04",
        "first_name": "Pragya",
        "middle_name": "",
        "last_name": "bharti",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_05",
        "first_name": "Puja",
        "middle_name": "",
        "last_name": "kumari",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_07",
        "first_name": "Chanchal",
        "middle_name": "",
        "last_name": "sen",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    },
    {
        "id": "Teacher_08",
        "first_name": "Miraya",
        "middle_name": "",
        "last_name": "shahay",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": false,
        "address": null
    },
    {
        "id": "Teacher_09",
        "first_name": "Vaishnavi",
        "middle_name": "",
        "last_name": "mishra",
        "dob": "1990-04-01",
        "phone": null,
        "email": null,
        "doj": "2024-04-01",
        "designation": "Teacher",
        "is_active": true,
        "address": null
    }
]);

  // Fetching employees list with async/await for better readability
  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await getAllEmployeesList();
  //       const employeeData = res?.data?.employee_data || [];
  //       setEmployees(employeeData);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchEmployees();
  // }, [refreshView]);

  // Handling action with useCallback to prevent unnecessary re-renders
  const handleAction = useCallback((data, action) => {
    if (action === "edit") {
      setSelectedEmployeeDetails(data || {});
      setIsAddEmployeeModalVisible(true);
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
      default:
        return employees;
    }
  }, [employees, selectedFilter]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <BackButton />
        <ToggleButtonGroup
          color="primary"
          value={selectedFilter}
          exclusive
          onChange={(event, status) => setSelectedFilter(status || "all")}
          aria-label="Employee Filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="new">New</ToggleButton>
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
          <p>Loading...</p>
        ) : (
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onAction={handleAction}
            />
          ))
        )}
      </Grid>
      {isAddEmployeeModalVisible && (
        <CreateEmployee
          isOpen={isAddEmployeeModalVisible}
          handleClose={handleClose}
          selectedData={selectedEmployeeDetails}
        />
      )}
    </>
  );
};

export default EmployeeList;
