import React from "react";
import RoutesView from "./Routes/RoutesView";
import VehiclesView from "./Vehicles/VehiclesView";
import { Grid } from "@mui/material";
import MappingsView from "./Mappings/MappingsView";
import StudentMappingView from "./Mappings/StudentMappingView";

const TransportView = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <RoutesView />
        </Grid>
        <Grid item xs={12}>
          <VehiclesView />
        </Grid>
        <Grid item xs={12}>
          <MappingsView />
        </Grid>
        <Grid item xs={12}>
          <StudentMappingView />
        </Grid>
      </Grid>
    </>
  );
};

export default TransportView;
