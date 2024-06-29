import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getStudentEvaluatedAssignment } from "../../ApiClient";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const assignmentData = {
  "question_number_1": {
    "type": "multiple_choice(radio)",
    "marks": 5,
    "question": "4+4",
    "time_taken": 5,
    "all_options": ["8", "10", "14"],
    "correct_answer": "8",
    "marks_received": 5,
    "selected_answer": "8"
  },
  "question_number_2": {
    "type": "multiple_choice(checkbox)",
    "marks": 5,
    "question": "colors of cat",
    "time_taken": 3,
    "all_options": ["red", "black", "blue"],
    "correct_answer": ["red", "black"],
    "marks_received": 5,
    "selected_answer": ["red", "black"]
  },
  "question_number_3": {
    "type": "fill_in_the_blanks",
    "marks": 5,
    "question": "Delhi is capital of __",
    "time_taken": 6,
    "all_options": [],
    "correct_answer": "India",
    "marks_received": 5,
    "selected_answer": "India"
  },
  "question_number_4": {
    "type": "subjective",
    "marks": 10,
    "question": "Essay on teacher",
    "time_taken": 8,
    "all_options": [],
    "correct_answer": "",
    "marks_received": 10,
    "selected_answer": "Testting"
  },
  "question_number_5": {
    "type": "subjective",
    "marks": 8,
    "question": "Essay on cow",
    "time_taken": 5,
    "all_options": [],
    "correct_answer": "",
    "marks_received": 2,
    "selected_answer": "Testing"
  }
};

const PaAssignmentDetails = () => {
  const query = useQuery();
  const assignmentId = query.get("assignment_id");
  const studentId = query.get("student_id");
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState({});

  useEffect(() => {
    if (assignmentId && studentId) {
      setIsLoading(true);
      setAssignmentDetails({});
      getStudentEvaluatedAssignment(assignmentId, studentId)
        .then((res) => {
          if (
            res?.data?.assignment_data &&
            Object.keys(res?.data?.assignment_data).length > 0
          ) {
            setAssignmentDetails(res?.data?.assignment_data);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [assignmentId, studentId]);

  return (
    <Container maxWidth="md">
      {Object.keys(assignmentDetails) && Object.keys(assignmentDetails).length > 0 ? <div>
        {Object.keys(assignmentDetails).map((key, index) => {
          const question = assignmentDetails[key];
          return (
            <Card key={index} style={{ marginBottom: 20 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {question.question}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {question.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Marks: {question.marks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time Taken: {question.time_taken} minutes
                </Typography>
                {question.all_options.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      Options:
                    </Typography>
                    {question.all_options.map((option, idx) => (
                      <Typography key={idx} variant="body2" color="textSecondary">
                        - {option}
                      </Typography>
                    ))}
                  </Box>
                )}
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Correct Answer: {Array.isArray(question.correct_answer) ? question.correct_answer.join(", ") : question.correct_answer}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Selected Answer: {Array.isArray(question.selected_answer) ? question.selected_answer.join(", ") : question.selected_answer}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Marks Received: {question.marks_received}
                  </Typography>
                </Box>
              </CardContent>
              {index < Object.keys(assignmentDetails).length - 1 && <Divider />}
            </Card>
          );
        })}
      </div>:<div className="text-center text-danger fw-bold">No Data Available</div>}
    </Container>
  );
};

export default PaAssignmentDetails;
