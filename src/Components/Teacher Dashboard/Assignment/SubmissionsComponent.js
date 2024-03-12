import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllStudentsAssignmentReport } from "../../../ApiClient";
import { Col, Row, Table } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SubmissionsPage = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (assignmentId) {
      getAllStudentsAssignmentReport(assignmentId)
        .then((response) => {
          console.log("API Response:", response.data.student_assignment_report);
          setSubmissions(response.data.student_assignment_report);
        })
        .catch((error) => {
          console.error("Error fetching assignment report:", error);
        });
    }
  }, [assignmentId]);

  return (
    <div className="vh-100 d-flex flex-column justify-content-start align-items-center">
      <h1>Submission page</h1>
      <Table responsive striped bordered hover className="mb-4">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
            <th>Student ID</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission?.student_id}>
              <td>{submission?.name}</td>
              <td>{submission?.status}</td>
              <td>{submission?.student_id}</td>
              <td className="d-flex gap-2">
                <FaCheckCircle
                  className="cursor-pointer h-6 w-6 text-[#4caf50]"
                  title="Evaluate Assignment"
                  onClick={() =>
                    navigate(
                      `/teacherDashboard/evaluteAssignment/${assignmentId}/${submission?.student_id}`
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubmissionsPage;
