import React from "react";
import { Grid } from "@mui/material";
import FeesStructureView from "./Fees/FeesStructureView";


const FinanceView = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FeesStructureView />
        </Grid>
      </Grid>
    </>
  );
};

export default FinanceView;
