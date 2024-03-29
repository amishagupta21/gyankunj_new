import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, Table } from "react-bootstrap";
import { loadAssignmentData } from '../../../ApiClient'
import { viewStudentAssignment } from '../../../ApiClient'
import './studentAssignment.css'

const AssignmentSheet = (props) => {
  console.log("Assignment Status:", props.assignmentStatus);

  const [fullscreen, setFullscreen] = useState(true);
  // const [assignmentFullData, setassignmentFullData] = useState({});
  const [assignlist, setAssignList] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const [show, setShow] = useState({
    show: false,
    index: ""
  });
  const [timers, setTimers] = useState([]);
  const [assignmentDuration, setAssignmentDuration] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);
  const [timerIntervals, setTimerIntervals] = useState([]);
  const [assignmentFullData, setAssignmentFullData] = useState({});

  useEffect(() => {
    fetchAssignmentData();
  }, []);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [instructionsClosed, setInstructionsClosed] = useState(false);
  const [elapsedTimes, setElapsedTimes] = useState({});
  const { assignmentStatus } = props;

  const areFieldsDisabled = () => {
    return assignmentStatus;
  };

  useEffect(() => {
    if (props.assignmentType === 'Test') {
      setShowInstructionsModal(true);
    } else {
      setInstructionsClosed(true);
    }
  }, []);

  const instructions = "You cannot switch tabs, and we are monitoring your activity.";

  const handleCloseInstructions = () => {
    setShowInstructionsModal(false);
    setInstructionsClosed(true);
  };


  useEffect(() => {
    if (timeLeft === 14 && props.assignmentType === "Test") {
      setShowTimeWarning(true);
    }
  }, [timeLeft, props.assignmentType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = timeLeft - 1;
      if (newTimeLeft >= 0) {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const userDetails = JSON.parse(localStorage.getItem('UserData'));

  const fetchAssignmentData = () => {
    const AssignmentId = props.assignmentId;
    const userId = JSON.parse(localStorage.getItem('UserData'))?.user_id;
    loadAssignmentData(AssignmentId, userId)
      .then((res) => {
        setAssignmentFullData(res.data.assignment_data);
        setAssignList(Object.values(res.data.assignment_data));
        setTimers(new Array(Object.values(res.data.assignment_data).length).fill({ startTime: null, endTime: null, elapsedTime: 0 }));
        setAssignmentDuration(res.data.assignment_duration);
        setTimerIntervals(new Array(Object.values(res.data.assignment_data).length).fill(null)); // Initialize timer intervals array
        setTimeLeft(res.data.assignment_duration * 60);
      })
      .catch((err) => console.log("AssignmentData err - ", err));
  };

  useEffect(() => {
    if (assignmentDuration !== null) {
      setTimeLeft(assignmentDuration * 60);
    }
  }, [assignmentDuration]);


  const handleShowQuestion = (index) => {
    if (show.index !== "") {
      const newTimers = [...timers];
      const now = Date.now();
      const elapsed = now - newTimers[show.index].startTime;
      newTimers[show.index].endTime = now;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);

      const newElapsedTimes = { ...elapsedTimes };
      newElapsedTimes[show.index] = newTimers[show.index].elapsedTime;
      setElapsedTimes(newElapsedTimes);
    }

    startTimerForQuestion(index);

    setShow({
      show: true,
      index: index
    });
  };
  const startTimerForQuestion = (index) => {
    const newTimers = [...timers];
    newTimers[index] = { startTime: Date.now(), endTime: null, elapsedTime: elapsedTimes[index] || 0 };
    setTimers(newTimers);
  };
  const handleQuestionCardClick = (index) => {
    if (show.index !== "") {
      const newTimers = [...timers];
      const now = Date.now();
      const elapsed = now - newTimers[show.index].startTime;
      newTimers[show.index].endTime = now;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);

      const newElapsedTimes = { ...elapsedTimes };
      newElapsedTimes[show.index] = newTimers[show.index].elapsedTime;
      setElapsedTimes(newElapsedTimes);
    }

    startTimerForQuestion(index);
    handleShowQuestion(index);
    setShow({
      show: true,
      index: index
    });
  };

  const handleMoveToQuestion = (index) => {
    if (show.index !== "") {
      const newTimers = [...timers];
      const now = Date.now();
      const elapsed = now - newTimers[show.index].startTime;
      newTimers[show.index].endTime = now;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);

      const newElapsedTimes = { ...elapsedTimes };
      newElapsedTimes[show.index] = newTimers[show.index].elapsedTime;
      setElapsedTimes(newElapsedTimes);
    }

    startTimerForQuestion(index);
  };
  const handleSubmitAnswer = (index) => {
    const newTimers = [...timers];
    const now = Date.now();
    const elapsed = now - newTimers[index].startTime;
    newTimers[index].endTime = now;
    newTimers[index].elapsedTime += elapsed;
    setTimers(newTimers);
  };

  const formatElapsedTime = (elapsedTime) => {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    let formattedTime = '';
    if (hours > 0) {
      formattedTime += hours + 'h ';
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += minutes + 'm ';
    }
    formattedTime += seconds + 's';

    return formattedTime;
  };


  const startTimer = (index) => {
    const newTimers = [...timers];
    newTimers[index] = { startTime: Date.now(), endTime: null, elapsedTime: 0 };
    setTimers(newTimers);
  };

  const handleSubmitAssignment = () => {
    if (show.index !== "") {
      const newTimers = [...timers];
      const now = Date.now();
      const elapsed = now - newTimers[show.index].startTime;
      newTimers[show.index].endTime = now;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);
    }
  };


  const formatTime = (seconds) => {
    if (seconds <= 0) {
      return "Time's up!";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} seconds`;
  };



  const handleUserAnswerChange = (value, questionId) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [questionId]: value
    }));

    const questionIndex = parseInt(questionId.split('_').pop()) - 1;

    setAssignList(prevState => {
      const updatedList = [...prevState];
      updatedList[questionIndex].selected_answer = value;
      return updatedList;
    });
  };

  const submitAssignment = () => {
    if (show.index !== "") {
      const newTimers = [...timers];
      newTimers[show.index].endTime = Date.now();
      const elapsed = newTimers[show.index].endTime - newTimers[show.index].startTime;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);
    }

    const assignmentData = assignlist.map((question, index) => {
      const questionId = `${index}`;
      // const questionId = `question_number_${index + 1}`;

      const startTime = timers[index]?.startTime;
      const endTime = timers[index]?.endTime;
      const elapsedTime = timers[index].elapsedTime;
      const questionTimeTaken = formatElapsedTime(elapsedTime);
      return {
        [questionId]: {
          type: question.type,
          question: question.question,
          selected_answer:"4",
          // selected_answer: userAnswers[questionId],
          all_options: question.all_options,
          marks: question.marks,
          time_taken: questionTimeTaken
          // time_taken: "5mins"
        }
      };
    });

    const timeSpent = assignmentDuration * 60 - timeLeft;
    const overallTime = formatTime(timeSpent);

    const requestBody = {
      student_id: userDetails.user_id,
      assignment_data: Object.assign({}, ...assignmentData),
      overall_time: overallTime,
      assignment_id: props.assignmentId,
      submit_data: true
    };
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiI0ODJjOTgxNS1iOWQ0LTRlNGYtOGJiNi0zOTRjODUyZDM1NWUiLCJleHAiOjI2NTMxMzc2MDV9.JPYYukYqWOulGx_JBHehSzKMpFalemeBxJsL6jDkWjA'; // Replace 'your-access-token' with the actual access token

    fetch('http://13.200.112.20:5005/submit_assignment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': accessToken
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Assignment submitted successfully:', data);
        // window.location.href = "/studentDashboard/Assignment";
      })
      .catch(error => {
        console.error('Error submitting assignment:', error);
      });
  };



  const saveProgress = () => {
    if (show.index !== "") {
      const newTimers = [...timers];
      newTimers[show.index].endTime = Date.now();
      const elapsed = newTimers[show.index].endTime - newTimers[show.index].startTime;
      newTimers[show.index].elapsedTime += elapsed;
      setTimers(newTimers);
    }

    const assignmentData = assignlist.map((question, index) => {
      const questionId = `question_number_${index + 1}`;
      const startTime = timers[index]?.startTime;
      const endTime = timers[index]?.endTime;
      const elapsedTime = timers[index].elapsedTime;
      const questionTimeTaken = formatElapsedTime(elapsedTime);
      return {
        [questionId]: {
          type: question.type,
          question: question.question,
          selected_answer: userAnswers[questionId],
          all_options: question.all_options,
          marks: question.marks,
          time_taken: questionTimeTaken
        }
      };
    });

    const timeSpent = assignmentDuration * 60 - timeLeft;
    const overallTime = formatTime(timeSpent);

    const requestBody = {
      student_id: userDetails.user_id,
      assignment_data: Object.assign({}, ...assignmentData),
      overall_time: overallTime,
      assignment_id: props.assignmentId,
      submit_data: false
    };

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiI0ODJjOTgxNS1iOWQ0LTRlNGYtOGJiNi0zOTRjODUyZDM1NWUiLCJleHAiOjI2NTMxMzc2MDV9.JPYYukYqWOulGx_JBHehSzKMpFalemeBxJsL6jDkWjA';  // Replace 'your-access-token' with the actual access token

    fetch('http://13.200.112.20:5005/submit_assignment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': accessToken
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        props.setAssignmentFullList(prevState => ({
          ...prevState,
          student_assignments: prevState.student_assignments.map(assignment => {
            if (assignment.assignment_id === props.assignmentId) {
              return {
                ...assignment,
                assignment_status: "Inprogress"
              };
            }
            return assignment;
          })
        }));
        return response.json();
      })

      .then(data => {
        console.log('Progress saved successfully:', data);
        window.location.href = "/studentDashboard/Assignment";
      })
      .catch(error => {
        console.error('Error saving progress:', error);
      });

  };


  useEffect(() => {
    if (timeLeft === 14 && props.assignmentType === "Test") {
      setShowTimeWarning(true);
      setTimeout(() => {
        setShowTimeWarning(false);
      }, 3000);
    }
  }, [timeLeft, props.assignmentType]);




  return (
    <>
      {instructionsClosed && (
        <Modal
          className="ModalBody"
          {...props}
          fullscreen={fullscreen}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ backgroundColor: "#E1E9F3" }}
        >
          <Modal.Header closeButton style={{
            background: "#7A9ABF 0% 0% no-repeat padding-box",
            borderRadius: "4px 4px 0px 0px",
            opacity: "1",
          }}>
            <Col md={8} className="assignmentName">
              Name of the assignment: <b>{props?.assignmentName}</b>
            </Col>
            <Col md={4} className="assignmentName">
              {!props.assignmentStatus && props.assignmentType !== "Test" && (
                <Button variant="primary" onClick={saveProgress}>Save Progress</Button>
              )}
            </Col>

            {showSubmitWarning && (
              <div className="submit-warning">
                <p>Your assignment will be auto-submitted in a few seconds.</p>
              </div>
            )}

          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              <div className="assignmentNameHeader">
                {props.assignmentType === "Test" && (
                  <Row>
                    <Col md={2} className="assignmentName">
                      <div className="duration-container">
                        {timeLeft > 0 ? (
                          <>
                            <div className="duration-text">Duration: {formatTime(timeLeft)}</div>
                          </>
                        ) : (
                          <div>Time's up!</div>
                        )}


                      </div>
                    </Col>
                    {timeLeft > 0 && (
                      <Col md={10} className="progress-ring">
                        <div className="progress-ring">
                          <svg className="progress-circle" width="60" height="60">
                            <circle
                              className="progress-circle"
                              stroke="#4CAF50"
                              strokeWidth="8"
                              fill="transparent"
                              r="26"
                              cx="30"
                              cy="30"
                              style={{
                                strokeDasharray: 2 * Math.PI * 26,
                                strokeDashoffset: `calc(${2 * Math.PI * 26} - (${2 * Math.PI * 26} * ${timeLeft} / (${assignmentDuration * 60})))`
                              }}
                            />
                          </svg>
                        </div>
                      </Col>
                    )}
                  </Row>
                )}
              </div>
            </Modal.Body>

            <Modal
              show={showTimeWarning}
              onHide={() => setShowTimeWarning(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Time Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hurry up! Only 14 seconds remaining.
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="secondary" onClick={() => setShowTimeWarning(false)}>OK</Button> */}
              </Modal.Footer>
            </Modal>
            <div className="card-container">
              {assignlist?.map((question, index) => (
                <div key={index} className="question-card" onClick={() => handleQuestionCardClick(index)}>
                  <div className="question-text">
                    Q.{index + 1} {question?.question}
                  </div>
                  <div className="answer-section">
                    <div className="type-info">
                      <strong>Type:</strong> {question.type}
                    </div>
                    {timers[index] && (
                      <div className="elapsed-time">
                        <strong>Elapsed Time:</strong> {formatTime(timers[index].elapsedTime / 1000)}
                      </div>
                    )}
                    {question.type === "multiple_choice(radio)" && (
                      <div className="options-container">
                        <p><strong>Options:</strong></p>
                        <ul className="options-list single-select">
                          {question.all_options.map((option, idx) => (
                            
                            <li key={idx}>
                              <label className="option-label">
                                <input
                                  disabled={areFieldsDisabled()}
                                  type="radio"
                                  name={`question-${index}`}
                                  value={option}
                                  checked={userAnswers[`question_number_${index + 1}`] === option || question.selected_answer === option}
                                  onChange={(e) => {
                                    handleUserAnswerChange(e.target.value, `question_number_${index + 1}`);
                                    const newSelectedAnswer = e.target.value;
                                    setAssignList(prevState => {
                                      const updatedList = [...prevState];
                                      updatedList[index].selected_answer = newSelectedAnswer;
                                      return updatedList;
                                    });
                                  }}
                                />
                                <span className="option-text">{option}</span>
                                {userAnswers[`question_number_${index + 1}`] === option && (
                                  <span className="selected-indicator"></span>
                                )}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {question.type === "Multi Select" && (
                      <div className="options-container">
                        <p><strong>Options:</strong></p>
                        <ul className="options-list multi-select">
                          {question.all_options.map((option, idx) => (
                            <li key={idx}>
                              <label className="option-label">
                                <input
                                  disabled={areFieldsDisabled()}
                                  type="checkbox"
                                  name={`question-${index}`}
                                  value={`${index}-${option}`}
                                  checked={userAnswers[`question_number_${index + 1}`]?.includes(`${index}-${option}`) || (question.selected_answer && question.selected_answer.includes(`${index}-${option}`))}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const option = e.target.value;
                                    let updatedOptions;

                                    if (isChecked) {
                                      updatedOptions = [...(userAnswers[`question_number_${index + 1}`] || []), option];
                                    } else {
                                      updatedOptions = (userAnswers[`question_number_${index + 1}`] || []).filter(selectedOption => selectedOption !== option);
                                    }

                                    // console.log("Updated options:", updatedOptions);

                                    handleUserAnswerChange(updatedOptions, `question_number_${index + 1}`);
                                  }}
                                />
                                <span className="option-text">{option}</span>
                                {question.selected_answer && question.selected_answer.includes(option) && (
                                  <span className="selected-indicator"></span>
                                )}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(question.type === "Fill the Blank" || question.type === "Write Answer") && (
                      <div className="answer-container">
                        <p><strong>Answer:</strong></p>
                        <textarea
                          className="answer-textarea"
                          rows={4}
                          cols={50}
                          placeholder="Type your answer here..."
                          value={userAnswers[`question_number_${index + 1}`] || question.selected_answer}
                          onChange={(e) => handleUserAnswerChange(e.target.value, `question_number_${index + 1}`)}
                          disabled={areFieldsDisabled()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </Modal.Body>
          <Modal.Footer>
            {!props.assignmentStatus && (
              <Button variant="outline-primary" onClick={submitAssignment}>Submit Assignment</Button>
            )}
          </Modal.Footer>

        </Modal>
      )}
      <Modal
        show={showInstructionsModal}
        onHide={handleCloseInstructions}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Test Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {instructions}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInstructions}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

};

export default AssignmentSheet;
