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
  const [timeSchedulesList, setTimeSchedulesList] = useState();
  const [dayFilter, setDayFilter] = useState(dayjs().format('dddd'));
  const [daysData, setDaysData] = useState([
    { value: "Monday", title: "Monday" },
    { value: "Tuesday", title: "Tuesday" },
    { value: "Wednesday", title: "Wednesday" },
    { value: "Thursday", title: "Thursday" },
    { value: "Friday", title: "Friday" },
    { value: "Saturday", title: "Saturday" },
    { value: "Sunday", title: "Sunday" }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTeacherRoutine("teacher", dayFilter)
      .then((res) => {
        setTimeSchedulesList(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
              <MenuItem key={index} value={item.value}>
                {item.title}
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
      }
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