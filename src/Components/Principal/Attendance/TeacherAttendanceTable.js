import React, { useMemo } from "react";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import { Box, LinearProgress, Typography } from "@mui/material";

const TeacherAttendanceTable = ({ data, isLoading }) => {

  const ProgressWithText = ({ value }) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{ height: 20, borderRadius: 25, width: '100%' }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" color="#fff">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };
  
  const columns = useMemo(
    () => [
      {
        accessorKey: "teacher_id",
        header: "Emp ID",
      },
      {
        accessorKey: "teacher_name",
        header: "Name",
      },
      {
        accessorKey: "present_days",
        header: "No. of days present",
      },
      {
        accessorKey: "absence_count",
        header: "No. of days absent",
      },
      {
        header: "Attendance %",
        accessorFn: (row) => (
          <ProgressWithText value={row.attendance_percentage} />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={data || []}
        renderTopToolbar={() => (
          <h5 className="mt-2">Teachers Attendance</h5>
        )}
      />
    </div>
  );
};

export default TeacherAttendanceTable;
