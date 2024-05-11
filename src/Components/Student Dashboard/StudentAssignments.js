import React, { useState, useMemo, useEffect } from "react";
import { studentAssignmentList } from "../../ApiClient";
import CommonMatTable from "../../SharedComponents/CommonMatTable";

const StudentAssignments = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [assignmentData, setAssignmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    studentAssignmentList(userInfo.user_id)
      .then((res) => {
        if (
          res?.data?.student_assignments &&
          res?.data?.student_assignments.length > 0
        ) {
          setAssignmentData(res?.data?.student_assignments);
        }
        setTimeout(() => {
            setIsLoading(false);
          }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  // Columns definition
  const columns = useMemo(
    () => [
      { accessorKey: "subject_name", header: "Subject" },
      { accessorKey: "assignment_name", header: "Assignment Name" },
      { accessorKey: "assignment_type_name", header: "Assignment Type" },
      { accessorKey: "assignment_status", header: "Status" },
    ],
    []
  );

  return (
    <>
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={assignmentData || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Assignments</h1>
        )}
      />
    </>
  );
};

export default StudentAssignments;
