import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
  CardActions,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getStudentEvaluatedAssignment } from "../../ApiClient";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
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

  const isAnswerCorrect = (correctAnswer, selectedAnswer) => {
    if (Array.isArray(correctAnswer) && Array.isArray(selectedAnswer)) {
      return correctAnswer.sort().join(",") === selectedAnswer.sort().join(",");
    }
    return correctAnswer === selectedAnswer;
  };

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Box className="d-flex justify-content-center align-items-center vh-100">
          <CircularProgress />
        </Box>
      ) : Object.keys(assignmentDetails).length > 0 ? (
        <div>
          {Object.keys(assignmentDetails).map((key, index) => {
            const question = assignmentDetails[key];
            const correct = isAnswerCorrect(
              question.correct_answer,
              question.selected_answer
            );
            return (
              <Card key={index} className={`mb-4 shadow border roundewd ${question.type !== "subjective" && (correct ? 'bg-success-subtle':'bg-danger-subtle')}`}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-primary"
                  >
                    {question.question}
                  </Typography>
                  <Divider className="bg-dark-subtle my-2" />
                  <Typography variant="body2" className="my-1">
                    <strong>Type:</strong> {question.type}
                  </Typography>
                  <Typography variant="body2" className="my-1">
                    <strong>Marks:</strong> {question.marks}
                  </Typography>
                  <Typography variant="body2" className="my-1">
                    <strong>Time Taken:</strong> {question.time_taken} minutes
                  </Typography>
                  {question.all_options.length > 0 && (
                    <Box>
                      <Typography variant="body2" className="my-1">
                        <strong>Options:</strong>
                      </Typography>
                      <ul>
                        {question.all_options.map((option, idx) => (
                          <li key={idx}>{option}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                  {question.type !== "subjective" && (
                    <Typography variant="body2" className="my-1">
                      <strong>Correct Answer:</strong>{" "}
                      {Array.isArray(question.correct_answer)
                        ? question.correct_answer.join(", ")
                        : question.correct_answer}
                    </Typography>
                  )}
                  <Typography variant="body2" className="my-1">
                    <strong>Selected Answer:</strong>{" "}
                    {Array.isArray(question.selected_answer)
                      ? question.selected_answer.join(", ")
                      : question.selected_answer}
                  </Typography>
                  <Typography variant="body2" className="my-1">
                    <strong>Marks Received:</strong> {question.marks_received}
                  </Typography>
                </CardContent>
                {question.type !== "subjective" && (
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color={correct ? "success" : "error"}
                    >
                      {correct ? (
                        <TaskAltOutlinedIcon />
                      ) : (
                        <UnpublishedOutlinedIcon />
                      )}
                      <strong className="ms-1 align-items-end">
                        {correct ? "Correct" : "Incorrect"}
                      </strong>
                    </Button>
                  </CardActions>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-danger text-center fw-bolder">
          No Data Available
        </div>
      )}
    </Container>
  );
};

export default PaAssignmentDetails;
