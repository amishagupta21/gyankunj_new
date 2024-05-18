import React, { useState, useMemo, useEffect } from "react";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getTeacherRoutine } from "../../../ApiClient";
import dayjs from "dayjs";

const TeacherRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [timeSchedulesList, setTimeSchedulesList] = useState();
  const [dayFilter, setDayFilter] = useState();
  const [daysData] = useState([
    {
      day_id: 1,
      day_name: "Monday",
    },
    {
      day_id: 2,
      day_name: "Tuesday",
    },
    {
      day_id: 3,
      day_name: "Wednesday",
    },
    {
      day_id: 4,
      day_name: "Thursday",
    },
    {
      day_id: 5,
      day_name: "Friday",
    },
    {
      day_id: 6,
      day_name: "Saturday",
    },
    {
      day_id: 7,
      day_name: "Sunday",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentDayName = dayjs().format("dddd").toLowerCase();
    const currentDayObject = daysData.find(
      (day) => day.day_name.toLowerCase() === currentDayName
    );
    if (currentDayObject) setDayFilter(currentDayObject.day_id);
  }, [daysData]);

  useEffect(() => {
    if (dayFilter) {
      setIsLoading(true);
      getTeacherRoutine(userInfo?.user_id, dayFilter)
        .then((res) => {
          setTimeSchedulesList(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [dayFilter]);

  const handleDayChange = (event) => {
    setDayFilter(event.target.value);
  };

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="day-filter-label">Day</InputLabel>
          <Select
            labelId="day-filter-label"
            value={dayFilter || ""}
            onChange={handleDayChange}
          >
            {daysData.map((item, index) => (
              <MenuItem key={index} value={item.day_id}>
                {item.day_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "period",
        header: "Period",
      },
      {
        accessorKey: "grade",
        header: "Grade",
      },
      {
        accessorKey: "section_name",
        header: "Section",
      },
      {
        accessorKey: "subject_name",
        header: "Subject",
      },
      {
        accessorKey: "time_range",
        header: "Time",
      },
    ],
    []
  );

  return (
    <div>
      <RenderTopToolbarCustomActions />
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={timeSchedulesList?.time_table || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>My Schedule</h1>
        )}
      />
    </div>
  );
};

export default TeacherRoutine;
