import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestions } from "../../../ApiClient";
import { Col, Row, Card, Badge } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";

const Viewreport = () => {
  const location = useLocation();
  const { assignment_id } = location.state;

  const [questionsData, setQuestionsData] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions(assignment_id);
        setQuestionsData({
          loading: false,
          data: response.data,
          error: null,
        });
      } catch (error) {
        setQuestionsData({
          loading: false,
          data: null,
          error: "Error fetching questions data",
        });
      }
    };

    fetchQuestions();
  }, [assignment_id]);

  return (
    <div className="vh-100 d-flex flex-column justify-content-start align-items-center">
      <Card className="w-100">
        <Card.Body
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            marginTop: "50px",
          }}
        >
          <h2 className="mb-4">Assignment Questions</h2>
          {questionsData.loading && <p>Loading...</p>}
          {questionsData.data && (
            <div>
              {questionsData.data &&
                questionsData.data.assignment_details &&
                questionsData.data.assignment_details.map(
                  (assignmentDetail, index) => (
                    <Card
                      key={index}
                      className="mb-4"
                      style={{ backgroundColor: "white", borderRadius: "8px" }}
                    >
                      <Card.Body
                        style={{
                          backgroundColor: "#bbfbf5",
                          borderRadius: "8px",
                        }}
                      >
                        {/* <h3 className="mb-3">Assignment Details</h3> */}
                        {assignmentDetail.assignment_data && (
                          <div>
                            {Object.keys(assignmentDetail.assignment_data).map(
                              (key) => (
                                <div
                                  key={key}
                                  style={{
                                    borderBottom: "2px solid #ccc",
                                    marginBottom: "20px",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    Type:{" "}
                                    {assignmentDetail.assignment_data[key].type}
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    Marks:{" "}
                                    {
                                      assignmentDetail.assignment_data[key]
                                        .marks
                                    }
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    Question:{" "}
                                    {
                                      assignmentDetail.assignment_data[key]
                                        .question
                                    }
                                  </p>
                                  <p>
                                    Answer:{" "}
                                    {
                                      assignmentDetail.assignment_data[key]
                                        .correct_answer
                                    }
                                  </p>
                                  {assignmentDetail.assignment_data[key]
                                    .type !== "fill_in_the_blanks" && (
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        marginTop: "8px",
                                      }}
                                    >
                                      All Options:{" "}
                                      {assignmentDetail.assignment_data[
                                        key
                                      ].all_options.map((option, index) => (
                                        <Badge
                                          key={index}
                                          pill
                                          variant="primary"
                                          className="mr-2"
                                          style={{
                                            marginRight: "5px",
                                            backgroundColor: "#3498db",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "5px 10px",
                                          }}
                                        >
                                          {option}
                                        </Badge>
                                      ))}
                                    </p>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  )
                )}
            </div>
          )}

          {questionsData.error && <p>{questionsData.error}</p>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Viewreport;
