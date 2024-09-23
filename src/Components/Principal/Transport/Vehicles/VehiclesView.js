import React, { useState, useMemo, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { getAllVehiclesList, getAllVehicleTypes } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateVehicle from "./CreateVehicle";

const VehiclesView = () => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();

  useEffect(() => {
    setIsLoading(true);
    getAllVehiclesList()
      .then((res) => {
        setVehiclesList([]);
        if (res?.data?.vehicles_data?.length > 0) {
          setVehiclesList(res.data.vehicles_data);
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

  useEffect(() => {
    getAllVehicleTypes()
      .then((res) => {
        setVehicleTypes([]);
        if (res?.data?.vehicle_types_data?.length > 0) {
          setVehicleTypes(res.data.vehicle_types_data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      { accessorKey: "vehicle_owner", header: "Vehicle owner" },
      { accessorKey: "vehicle_type", header: "Vehicle type" },
      { accessorKey: "vehicle_registration_number", header: "Registration number" },
      { accessorKey: "manufacturing_date", header: "Manufacturing date" },
      { accessorKey: "insurance_expiry_date", header: "Insurance expiry date" },
      { accessorKey: "pollution_expiry_date", header: "Pollution expiry date" },
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
        <Button
          variant="contained"
          onClick={() => setIsModalVisible(true)}
        >
          Create Vehicle
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
        data={vehiclesList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Vehicles</h1>
        )}
      />
      {isModalVisible && (
        <CreateVehicle
          isOpen={isModalVisible}
          handleClose={handleClose}
          vehicleTypes={vehicleTypes}
          initialData={selectedVehicle}
        />
      )}
    </>
  );
};

export default VehiclesView;
