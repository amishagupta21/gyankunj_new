import React, { useState, useMemo, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { getAllFleetStaffsList } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateFleetStaff from "./CreateFleetStaff";

const FleetStaffView = () => {
  const [fleetStaffsList, setFleetStaffsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFleetStaff, setSelectedFleetStaff] = useState();
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllFleetStaffsList()
      .then((res) => {
        setFleetStaffsList([]);
        if (res?.data?.staff_data?.length > 0) {
          setFleetStaffsList(res.data.staff_data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [refreshTable]);

  const handleClose = (isSubmit) => {
    setIsModalVisible(false);
    if (isSubmit) {
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  // Columns definition
  const columns = useMemo(
    () => [
      { accessorKey: "staff_name", header: "Staff name" },
      { accessorKey: "employee_id", header: "Employee id" },
      { accessorKey: "staff_role", header: "Staff role" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "date_of_birth", header: "Date of birth" },
      { accessorKey: "phone_number", header: "Phone number" },
      { accessorKey: "license_number", header: "License number" },
      { accessorKey: "license_expiry_date", header: "License expiry date" },
    ],
    []
  );

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          justifyContent: "end",
        }}
      >
        <Button variant="contained" onClick={() => setIsModalVisible(true)}>
          Create Fleet Staff
        </Button>
      </Box>
    );
  };

  return (
    <>
      <RenderTopToolbarCustomActions />

      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={fleetStaffsList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Fleet Staff</h1>
        )}
      />
      {isModalVisible && (
        <CreateFleetStaff
          isOpen={isModalVisible}
          handleClose={handleClose}
          initialData={selectedFleetStaff}
        />
      )}
    </>
  );
};

export default FleetStaffView;
