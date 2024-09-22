import React, { useState, useMemo, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { getAllRoutesList, getAllVehicleTypes } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateVehicle from "./CreateVehicle";

const VehiclesView = () => {
  const [routesList, setRoutesList] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoutesModalVisible, setIsAddRoutesModalVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState();

  useEffect(() => {
    setIsLoading(true);
    getAllRoutesList()
      .then((res) => {
        setRoutesList([]);
        if (res?.data?.routes_data?.length > 0) {
          setRoutesList(res.data.routes_data);
          const transformed = transformData(res.data.routes_data);
          setTransformedData(transformed);
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

  // Transformation logic
  const transformData = (data) => {
    const groupedRoutes = data.reduce((acc, item) => {
      const { route_name, stop_point_name, route_charge } = item;

      if (!acc[route_name]) {
        acc[route_name] = {
          route_name,
          stop_points: [],
        };
      }

      acc[route_name].stop_points.push({ stop_point_name, route_charge });

      return acc;
    }, {});

    return {
      start_point_name: data[0]?.start_point_name || "Unknown",
      route_stop_info: Object.values(groupedRoutes),
    };
  };

  const handleClose = (isSubmit) => {
    setIsAddRoutesModalVisible(false);
    if (isSubmit) {
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  // Columns definition
  const columns = useMemo(
    () => [
      { accessorKey: "route_name", header: "Route name" },
      { accessorKey: "start_point_name", header: "Start point name" },
      { accessorKey: "stop_point_name", header: "Stop point name" },
      { accessorKey: "stop_order", header: "Stop order" },
      { accessorKey: "route_charge", header: "Route charge" },
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
          onClick={() => setIsAddRoutesModalVisible(true)}
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
        data={routesList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Vehicles</h1>
        )}
      />
      {isAddRoutesModalVisible && (
        <CreateVehicle
          isOpen={isAddRoutesModalVisible}
          handleClose={handleClose}
          vehicleTypes={vehicleTypes}
          initialData={transformedData}
        />
      )}
    </>
  );
};

export default VehiclesView;
