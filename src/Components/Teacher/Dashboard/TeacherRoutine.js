import React, { useState, useMemo, useEffect } from "react";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getDaysData, getTeacherRoutine } from "../../../ApiClient";
import dayjs from "dayjs";

const TeacherRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [timeSchedulesList, setTimeSchedulesList] = useState();
  const [dayFilter, setDayFilter] = useState();
  const [daysData, setDaysData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDaysData().then((res) => {
      if (res?.data?.days && res?.data?.days.length > 0) {
        setDaysData(res?.data?.days);
      }
    });
  }, []);

  useEffect(() => {
    if (daysData && daysData.length > 0) {
      const currentDayName = dayjs().format("dddd").toLowerCase();
      const currentDayObject = daysData.find(
        (day) => day.day_name.toLowerCase() === currentDayName
      );
      if (currentDayObject) setDayFilter(currentDayObject.day_id);
    }
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
        header: "Time",
        accessorFn: (row) => <div>{row.start_time} - {row.end_time}</div>,
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
