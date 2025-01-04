import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import FeesStructureView from "./Fees/FeesStructureView";

const FinanceView = () => {
  const tabsList = [
    { code: "report", title: "Report", content: <div className="text-center mt-5 text-danger">No view available right now</div> },
    { code: "earning", title: "Earning", content: <FeesStructureView /> },
    { code: "expenses", title: "Expenses", content: <div className="text-center mt-5 text-danger">No view available right now</div> },
  ];

  const [selectedTab, setSelectedTab] = React.useState(tabsList[0].code);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Finance tabs"
        sx={{ marginBottom: 2 }}
      >
        {tabsList.map((tab) => (
          <Tab
            key={tab.code}
            value={tab.code}
            label={tab.title}
            aria-controls={`tabpanel-${tab.code}`}
            wrapped
          />
        ))}
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {tabsList.find((tab) => tab.code === selectedTab)?.content}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinanceView;
