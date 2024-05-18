import React from "react";
import StudentRoutine from "./StudentRoutine";
import StudentSubject from "./StudentSubject";
import { Grid, Stack } from "@mui/material";
import StudentAssignments from "./StudentAssignments";
import SResources from "./Resources/SResources";

const SDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack direction="column" spacing={5}>
          {/* <StudentSubject /> */}
          <SResources title={"Subject"} />
          <StudentAssignments />
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <StudentRoutine />
      </Grid>
    </Grid>
  );
};

export default SDashboard;
