import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { getAllHrmsDashboardData } from "../../../ApiClient";
import EmployeeList from "./EmployeeList";
import { Navigate, useNavigate } from "react-router-dom";

// Reusable card component for stats
const StatCard = ({ title, value, icon, bgColor, onClick }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card
      onClick={onClick}
      className="cursor rounded-4 shaped text-center"
      sx={{
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Box className="d-flex justify-content-center align-items-center w-100 mb-2">
          <Box
            className="d-flex justify-content-center align-items-center rounded-circle"
            sx={{ width: 60, height: 60, backgroundColor: bgColor }}
          >
            {icon}
          </Box>
        </Box>
        <Typography>{title}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const HrmsDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [hrmsMetadata, setHrmsMetadata] = useState();
  const [isEmployeeView, setIsEmployeeView] = useState(false);

  useEffect(() => {
    getAllHrmsDashboardData()
      .then((res) => {
        setHrmsMetadata([]);
        if (res?.data?.hrms_data?.length > 0) {
          setHrmsMetadata(res.data.staffs_data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sample JSON data for props
  const data = {
    total_count: 200,
    present: 188,
    on_leave: ["EMP_1", "EMP_2"],
    new_joinee: ["EMP_4", "EMP_5"],
    attendance_overview: [
      { month: "january", on_time: 180, late_arrival: 10, absent: 10 },
      { month: "february", on_time: 170, late_arrival: 10, absent: 20 },
      { month: "march", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "april", on_time: 150, late_arrival: 30, absent: 50 },
      { month: "may", on_time: 120, late_arrival: 60, absent: 20 },
      { month: "june", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "july", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "august", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "october", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "november", on_time: 160, late_arrival: 10, absent: 30 },
      { month: "december", on_time: 160, late_arrival: 10, absent: 30 },
    ],
    news_and_events: [
      { date: "2012-01-01", title: "News 1", description: "This is a news 1" },
      { date: "2024-02-05", title: "News 2", description: "This is a news 2" },
      { date: "2023-05-10", title: "News 3", description: "This is a news 3" },
    ],
  };

  const {
    total_count,
    present,
    on_leave,
    new_joinee,
    attendance_overview,
    news_and_events,
  } = data;
  const happiness_rate = ((present / total_count) * 100).toFixed(0);

  // Attendance chart data
  const attendanceData = {
    labels: attendance_overview.map((item) => item.month),
    datasets: [
      {
        label: "On Time",
        data: attendance_overview.map((item) => item.on_time),
        backgroundColor: "green",
      },
      {
        label: "Late Arrival",
        data: attendance_overview.map((item) => item.late_arrival),
        backgroundColor: "orange",
      },
      {
        label: "Absent",
        data: attendance_overview.map((item) => item.absent),
        backgroundColor: "red",
      },
    ],
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Handlers for each card click event
  const handleTotalEmployeesClick = () => {
    navigate('/principalDashboard/hrmsPortal/employeeView?activeView=all');
  };  

  const handleOnLeaveClick = () => {
    alert("You clicked On Leave Card!"); // Perform an action for "On Leave"
  };

  const handleNewJoineeClick = () => {
    navigate('/principalDashboard/hrmsPortal/employeeView?activeView=new');
  };

  const handleHappinessRateClick = () => {
    alert("You clicked Happiness Rate Card!"); // Perform an action for "Happiness Rate"
  };

  return (
    <>
      <Box>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">
              <span className="text-secondary">Hello</span>{" "}
              <span className="fw-bold">{getGreeting()}</span>
            </Typography>
          </Box>
          <Button className="rounded-pill" variant="contained" color="warning">
            + Add Employee
          </Button>
        </Grid>

        {/* Stat Cards */}
        <Grid container spacing={3} mt={3}>
          <StatCard
            title="Total Employees"
            value={total_count}
            icon={<GroupOutlinedIcon />}
            bgColor="#bfa7fb"
            onClick={handleTotalEmployeesClick}
          />
          <StatCard
            title="On Leave"
            value={`${on_leave.length}/${total_count}`}
            icon={<ArticleOutlinedIcon />}
            bgColor="#f2bdab"
            onClick={handleOnLeaveClick}
          />
          <StatCard
            title="New Joinee"
            value={`${new_joinee.length}/${total_count}`}
            icon={<GroupAddOutlinedIcon />}
            bgColor="#70938e"
            onClick={handleNewJoineeClick}
          />
          <StatCard
            title="Happiness Rate"
            value={`${happiness_rate}%`}
            icon={<SentimentSatisfiedAltOutlinedIcon />}
            bgColor="#c39857"
            onClick={handleHappinessRateClick}
          />
        </Grid>

        {/* Attendance Overview and News & Events in a single row on large screens */}
        <Grid container spacing={3} mt={5}>
          {/* Attendance Overview */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-4 shaped p-3">
              <Typography variant="h6" mb={2} className="fw-bold">
                Attendance Overview
              </Typography>
              <CardContent>
                <Bar data={attendanceData} />
              </CardContent>
            </Card>
          </Grid>

          {/* News & Events */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-4 shaped p-3">
              <Typography variant="h6" mb={2} className="fw-bold">
                News & Events
              </Typography>
              <Grid container spacing={3}>
                {news_and_events.map((event) => (
                  <Grid item xs={12} sm={6} key={event.date}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Date Section */}
                      <Box
                        sx={{
                          width: 50,
                          height: 60,
                          backgroundColor: "#d9d9d9",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          mr: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#333" }}
                        >
                          {new Date(event.date).getDate()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666" }}
                          className="fw-bold"
                        >
                          {new Date(event.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </Typography>
                      </Box>

                      {/* Event Details */}
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "#333" }}
                          gutterBottom
                        >
                          {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#888" }}>
                          {event.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HrmsDashboard;
