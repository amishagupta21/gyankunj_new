import React, { useMemo, useState, useCallback } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  styled,
} from "@mui/material";
import { markStaffAttendance } from "../ApiClient";
import { showAlertMessage } from "./AlertMessage";

// Styled ToggleButton for customization
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // No hover effect for selected
    },
  },
  "&:not(.Mui-selected)": {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.grey[400], // Hover effect only for unselected
    },
  },
}));

const AttendanceToggle = () => {
  const userInfo = useMemo(
    () => JSON.parse(localStorage.getItem("UserData")),
    []
  );
  const [showAlert, setShowAlert] = useState("");
  const [alignment, setAlignment] = useState(
    userInfo.attendance_status === true
      ? "IN"
      : userInfo.attendance_status === false
      ? "OUT"
      : null
  );

  const handleToggleChange = useCallback(
    async (event, newAlignment) => {
      if (newAlignment === null) return; // Prevent deselection
      setAlignment(newAlignment);
      const updatedUserInfo = {
        ...userInfo,
        attendance_status: newAlignment === "IN" ? true : newAlignment === "OUT" ? false : null,
      };

      localStorage.setItem("UserData", JSON.stringify(updatedUserInfo));
      const payload = {
        user_id: userInfo.user_id,
        attendance_date: new Date().toISOString().split("T")[0], // Current date
        attendance_time: new Date().toLocaleTimeString("en-GB"), // Current time in HH:mm:ss format
        status:  newAlignment === "IN" ? true : newAlignment === "OUT" ? false : null, // IN or OUT
      };

      try {
        const res = await markStaffAttendance(payload);
        if (res?.data?.status === "success") {
          setShowAlert("success");
          const updatedUserInfo = {
            ...userInfo,
            attendance_status: newAlignment === "IN" ? true : newAlignment === "OUT" ? false : null,
          };
  
          localStorage.setItem("UserData", JSON.stringify(updatedUserInfo));
        } else {
          setShowAlert("error");
        }
      } catch (err) {
        setShowAlert("error");
      } finally {
        setTimeout(() => setShowAlert(""), 3000);
      }
    },
    [userInfo]
  );

  return (
    <div className="d-flex gap-3 align-items-center justify-content-end">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Mark Attendance
      </Typography>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Attendance Toggle"
      >
        <StyledToggleButton value="IN" aria-label="IN" disabled={userInfo.attendance_status === true || userInfo.attendance_status === false}>
          IN
        </StyledToggleButton>
        <span style={{width: 1}}></span>
        <StyledToggleButton value="OUT" aria-label="OUT" disabled={userInfo.attendance_status === false}>
          OUT
        </StyledToggleButton>
      </ToggleButtonGroup>
      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `Attendance marking ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </div>
  );
};

export default AttendanceToggle;
