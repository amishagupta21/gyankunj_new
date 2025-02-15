import React, { useEffect } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import FeesStructureView from "./Fees/FeesStructureView";
import ExpensesView from "./Expenses/ExpensesView";
import FeeDetails from "./Fees/FeeDetails";
import { useLocation, useNavigate } from "react-router-dom";
import AdmissionFeesView from "./Report/AdmissionFeesView";

const FinanceView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState();
  const tabsList = [
    {
      code: "report",
      title: "Report",
      content: (
        <AdmissionFeesView />
      ),
    },
    {
      code: "earning",
      title: "Earning",
      content: (
        <div>
          <FeesStructureView /> <hr className="my-5" />
          <FeeDetails />
        </div>
      ),
    },
    { code: "expenses", title: "Expenses", content: <ExpensesView /> },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeView = queryParams.get("activeView") || tabsList[0].code;
    setSelectedTab(activeView);
  }, [location.search]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(`?activeView=${newValue}`, { replace: true });
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
