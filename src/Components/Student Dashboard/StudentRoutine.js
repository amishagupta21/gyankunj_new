import React, { useEffect, useState } from "react";
import { getStudentRoutineData } from "../../ApiClient";
import { Divider, Paper, Stack, styled } from "@mui/material";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 250,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    whiteSpace: "normal", // Allow text to wrap
}));

const StudentRoutine = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [studentRoutineData, setStudentRoutineData] = useState([]);

  useEffect(() => {
    getStudentRoutineData(userInfo.grade_id, userInfo.section_id)
      .then((res) => {
        if (res?.data?.time_table && res?.data?.time_table.length > 0) {
          setStudentRoutineData(res?.data?.time_table);
        }
      })
      .catch((err) => console.log("Routine err - ", err));
  }, []);

  return (
    <div>
      <h4 className="text-center">My Routine</h4>
      {studentRoutineData && studentRoutineData.length > 0 && (
        <Stack direction="column" className="d-flex align-items-center" spacing={2}>
          {studentRoutineData.map((item, index) => (
            <DemoPaper key={index} className="bg-primary text-white" variant="outlined">
              <p>{item.day}</p>
              <Divider className="bg-white mb-3" />
              <p className="text-truncate" title={item.subject_name}>{item.subject_name}</p>
            </DemoPaper>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default StudentRoutine;
