import React, { useState, useMemo, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { getAllRoutesList } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateFleetStaff from "./CreateFleetStaff";

const FleetStaffView = () => {
  const [routesList, setRoutesList] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoutesModalVisible, setIsAddRoutesModalVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

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
        data={routesList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Fleet Staff</h1>
        )}
      />
      {isAddRoutesModalVisible && (
        <CreateFleetStaff
          isOpen={isAddRoutesModalVisible}
          handleClose={handleClose}
          initialData={transformedData}
        />
      )}
    </>
  );
};

export default FleetStaffView;
