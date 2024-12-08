import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TextField, Checkbox } from "@mui/material";
import CommonMatTable from "../../../SharedComponents/CommonMatTable";
import {
  fetchAttendanceDataForReview,
  updateStaffAttendanceData,
} from "../../../ApiClient";

const AttendanceReview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(new Map());

  // Fetch Attendance Data
  useEffect(() => {
    const loadAttendanceData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAttendanceDataForReview();
        if (res?.data?.attendance_data) {
          setAttendanceData(res.data.attendance_data);
        } else {
          console.warn("No attendance data available");
        }
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAttendanceData();
  }, []);

  // Handle Regularized Checkbox Change
  const handleCheckboxChange = useCallback((index, value) => {
    setAttendanceData((prev) => {
      const updated = [...prev];
      updated[index].is_regularized = value;
      return updated;
    });

    setUpdatedData((prev) => {
      const updated = new Map(prev);
      updated.set(attendanceData[index].user_id, {
        ...attendanceData[index],
        is_regularized: value,
      });
      return updated;
    });
  }, [attendanceData]);

  // Handle Comments Change
  const handleCommentsChange = useCallback((index, value) => {
    setAttendanceData((prev) => {
      const updated = [...prev];
      updated[index].comments = value;
      return updated;
    });

    setUpdatedData((prev) => {
      const updated = new Map(prev);
      updated.set(attendanceData[index].user_id, {
        ...attendanceData[index],
        comments: value,
      });
      return updated;
    });
  }, [attendanceData]);

  // Handle Bulk/Single Update
  const handleUpdate = async () => {
    if (updatedData.size === 0) {
      alert("No changes to update.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {"attendance_data":  Array.from(updatedData.values())};
      await updateStaffAttendanceData(payload);
      alert("Update successful!");
      setUpdatedData(new Map());
    } catch (err) {
      console.error("Error updating attendance data:", err);
      alert("Update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "user_details",
        header: "User Details",
        accessorFn: (row, index) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Checkbox
              checked={!!row.is_regularized}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              <span>{row.user_name}</span>
          </div>
        ),
      },
      { accessorKey: "attendance_in_time", header: "Attendance IN Time" },
      { accessorKey: "attendance_out_time", header: "Attendance Out Time" },
      { accessorKey: "attendance_status", header: "Status" },
      {
        accessorKey: "comments",
        header: "Comments",
        accessorFn: (row, index) => (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={row.comments || ""}
            onChange={(e) => handleCommentsChange(index, e.target.value)}
          />
        ),
      },
    ],
    [handleCheckboxChange, handleCommentsChange]
  );

  return (
    <>
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={attendanceData}
        renderTopToolbar={() => (
          <div
          className="w-100"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: 18, margin: 0 }}>Attendance Review</h1>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        )}
      />
    </>
  );
};

export default AttendanceReview;
