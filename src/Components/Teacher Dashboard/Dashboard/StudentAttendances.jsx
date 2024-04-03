import React, { useState, useMemo } from "react";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StudentAttendances = () => {
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateFilter(newValue);
  };

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (<Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom:2 }}>
    <FormControl sx={{ minWidth: 'calc(100%/3)' }}>
      <InputLabel id="grade-filter-label">Grade</InputLabel>
      <Select
        labelId="grade-filter-label"
        value={gradeFilter}
        onChange={handleGradeChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="A">A</MenuItem>
        <MenuItem value="B">B</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ minWidth: 'calc(100%/3)' }}>
      <InputLabel id="section-filter-label">Section</InputLabel>
      <Select
        labelId="section-filter-label"
        value={sectionFilter}
        onChange={handleSectionChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Section 1">Section 1</MenuItem>
        <MenuItem value="Section 2">Section 2</MenuItem>
      </Select>
    </FormControl>
    {/* <FormControl fullWidth sx={{ minWidth: 150 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    </FormControl> */}
  </Box>)
  }

  // Sample data
  const data = [
    {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
      grade: "A",
      section: "Section 1",
      date: new Date(2024, 3, 1), // April 1, 2024
    },
    {
      name: {
        firstName: "Jane",
        lastName: "Doe",
      },
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
      grade: "B",
      section: "Section 2",
      date: new Date(2024, 3, 2), // April 2, 2024
    },
    // Add more data as needed
  ];

  // Filtered data based on filter values
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (gradeFilter === "" || item.grade === gradeFilter) &&
        (sectionFilter === "" || item.section === sectionFilter) &&
        (!dateFilter || item.date.getTime() === dateFilter.getTime())
      );
    });
  }, [data, gradeFilter, sectionFilter, dateFilter]);

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName",
        header: "First Name",
        size: 150,
        filterable: false,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
    <RenderTopToolbarCustomActions />
    <CommonMatTable
      columns={columns}
      data={filteredData}
      renderTopToolbar={() => <h4>Student's attendance</h4>}
    />
    </div>
  );
};

export default StudentAttendances;
