import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { Button, Grid } from "@mui/material";
import BackButton from "../../../SharedComponents/BackButton";
import CreateEmployee from "./CreateEmployee";

const EmployeeList = () => {
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);
  const [refreshView, setRefreshView] = useState(false)
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState();
  const [employees, setEmployees] = useState([
    {
      id: 12,
      image: "",
      name: "Annette Black",
      dob: "10-06-1993",
      phone: 9717814207,
      email: "black@mailinator.com",
      doj: "12-07-2024",
      designation: "Priciple",
      isActive: true,
      address: "Sector 45, Noida",
    },
    {
      id: 13,
      image: "",
      name: "Fatima Nuhan",
      dob: "12-10-1995",
      phone: 9717812207,
      email: "fatima@mailinator.com",
      doj: "10-08-2023",
      designation: "Teacher",
      isActive: false,
      address: "Sector 62, Noida",
    },
  ]);

  const handleAction = (data, action) => {
    if(data && Object.keys(data).length > 0){
      setSelectedEmployeeDetails(data);
    }
    if(action === 'edit'){
      setIsAddEmployeeModalVisible(true);
    }
    console.log(data);
    console.log(action);
  };

  const handleClose = (isSubmit) => {
    setIsAddEmployeeModalVisible(false);
    setSelectedEmployeeDetails({});
    if (isSubmit) {
      setTimeout(() => {
        setRefreshView(!refreshView);
      }, 500);
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <BackButton />
        <Button className="rounded-pill" variant="contained" onClick={()=> handleAction("", "edit")} color="warning">
          + Add Employee
        </Button>
      </Grid>
      <Grid container spacing={3} mt={1}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onAction={handleAction}
          />
        ))}
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
