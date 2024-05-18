import React, { useEffect, useState } from "react";
import { getStudentSubjectData } from "../../ApiClient";
import { Paper, Stack, styled } from "@mui/material";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 200,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    whiteSpace: "normal", 
    fontWeight: 'bold'
}));

const StudentSubject = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    getStudentSubjectData(userInfo.user_id)
      .then((res) => {
        if (res?.data?.subjects && res?.data?.subjects.length > 0) {
          setSubjectsList(res?.data?.subjects);
        }
      })
      .catch((err) => console.log("Routine err - ", err));
  }, []);

  return (
    <div>
      <h4>Subjects</h4>
      {subjectsList && subjectsList.length > 0 && (
        <Stack direction="row" spacing={2}>
          {subjectsList.map((item, index) => (
            <DemoPaper key={index} className="bg-body-secondary align-content-center" variant="outlined">
              <p className="text-truncate" title={item.subject_name}>{item.subject_name}</p>
            </DemoPaper>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default StudentSubject;
