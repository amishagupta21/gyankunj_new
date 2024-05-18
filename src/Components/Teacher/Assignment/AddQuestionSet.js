import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import {
  saveLessonPlan,
  getLessonPlanMetadata,
  getGradeDetails,
} from "../../../ApiClient";
import "./assignment.css";

const AddQuestionSet = (props) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [questionType, setQuestionType] = useState("");
  const [AssignmentDataFromSingleChild, setAssignmentDataFromSingleChild] =
    useState([]);
  const [assignmentFinalQuestionData, setAssignmentFinalQuestionData] =
    useState([]);
  const [questionData, setQuestionData] = useState(false);
  const [dataToSend, setDataToSend] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([{}]);
  const [ansOptionData, setAnsOptionData] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [disableQuestionSet, setDisableQuestionSet] = useState(false);
  const [fillBlankQuestionData, setFillBlankQuestionData] = useState("");
  const [correctAnswerData, setCorrectAnswerData] = useState("");
  const [multipleAnswerOptions, setMultipleAnswerOptions] = useState([{}]);
  const [multiQuestionText, setMultiQuestionText] = useState("");
  const [subjectiveQuestionData, setSubjectiveQuestionData] = useState("");
  const [answerJumbleOptions, setAnswerUnjumbleOptions] = useState([{}]);
  const [unJumblequestionText, setUnJumbleQuestionText] = useState("");
  const [marksData, setmarksData] = useState('')

  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  const questionTypeOptions = [
    { value: "fill_in_the_blanks", label: "Fill in the blanks" },
    { value: "multiple_choice(radio)", label: "Single Select" },
    { value: "multiple_choice(checkbox)", label: "Multiple Choice" },
    { value: "subjective", label: "Subjective" },
    { value: "unjumble", label: "Unjumble the word" },
  ];


  // Single Choice

  const addOptions = () => {
    setAnswerOptions([...answerOptions, {}]);
  };

  const handleInputChange = (e, indx) => {
    const { name, value } = e.target;
    const list = [...answerOptions];
    list[indx] = value;
    setAnswerOptions(list);
  };

  const deleteOptions = (indx) => {
    const optionList = [...answerOptions];
    optionList.splice(indx, 1);
    setAnswerOptions(optionList);
  };

  console.log("marksData = ", marksData)

  const saveSingleOptionAssignment = () => {
    let dataFromSingleSelect = [...savedData];
    let savedAssignmentData = {
      type: "multiple_choice(radio)",
      question: questionText,
      correct_answer: "",
      all_options: answerOptions,
      marks: marksData,
    };

    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    setSavedData(dataFromSingleSelect);

    // setSavedData(savedAssignmentData)
    // setDisableQuestionSet(true)
    props.finalDataSetFromChild(savedAssignmentData)
    props.closeModal()
  };

  // Fill In The Blanks

  const handleQuestionData = (e) => {
    setFillBlankQuestionData(e.target.value);
  };

  const handleMarksData = (e) => {
    setmarksData(e.target.value)
  }

  const handleCorrectAnswer = (e) => {
    setCorrectAnswerData(e.target.value);
  };

  const saveFillBlankAssignment = () => {
    let dataFromSingleSelect = [...savedData];
    const savedAssignmentData = {
      type: "fill_in_the_blanks",
      question: fillBlankQuestionData,
      correct_answer: correctAnswerData,
      all_options: [],
      marks: marksData,
    };

    console.log("savedAssignmentData - ", savedAssignmentData)

    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    setSavedData(dataFromSingleSelect);
    props.finalDataSetFromChild(savedAssignmentData)
    props.closeModal()
  };

  // Multi Choice

  const addMultiOptions = () => {
    setMultipleAnswerOptions([...multipleAnswerOptions, {}]);
  };

  const handleMultiInputChange = (e, indx) => {
    const { name, value } = e.target;
    const list = [...multipleAnswerOptions];
    list[indx] = value;
    setMultipleAnswerOptions(list);
  };

  const deleteMultiOptions = (indx) => {
    const optionList = [...multipleAnswerOptions];
    optionList.splice(indx, 1);
    setMultipleAnswerOptions(optionList);
  };

  const saveMultiAssignment = () => {
    let dataFromSingleSelect = [...savedData];
    let savedAssignmentData = {
      type: "multiple_choice(checkbox)",
      question: multiQuestionText,
      correct_answer: "",
      all_options: multipleAnswerOptions,
      marks: marksData,
    };

    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    setSavedData(dataFromSingleSelect);
    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    props.finalDataSetFromChild(savedAssignmentData)
    props.closeModal()
  };

  // Subjective Questions

  const handleSubjectiveQuestionData = (e) => {
    setSubjectiveQuestionData(e.target.value);
  };

  const saveSubjectiveAssignment = () => {
    let dataFromSingleSelect = [...savedData];
    const savedAssignmentData = {
      type: "subjective",
      question: subjectiveQuestionData,
      correct_answer: "",
      all_options: [],
      marks: marksData,
    };
    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    setSavedData(dataFromSingleSelect);
    props.finalDataSetFromChild(savedAssignmentData)
    props.closeModal()
  };

  // UnJumble the word

  const addUnJumbleOptions = () => {
    setAnswerUnjumbleOptions([...answerJumbleOptions, {}]);
  };

  const handleJumbleInputChange = (e, indx) => {
    const { name, value } = e.target;
    const list = [...answerJumbleOptions];
    list[indx] = value;
    setAnswerUnjumbleOptions(list);
  };

  const deleteJumbleOptions = (indx) => {
    const optionList = [...answerJumbleOptions];
    optionList.splice(indx, 1);
    setAnswerUnjumbleOptions(optionList);
  };

  const saveUnJumbleAssignment = () => {
    let dataFromSingleSelect = [...savedData];
    let savedAssignmentData = {
      type: "unjumble",
      question: unJumblequestionText,
      correct_answer: "",
      all_options: answerJumbleOptions,
      marks: marksData,
    };

    dataFromSingleSelect = [...dataFromSingleSelect, savedAssignmentData];
    setSavedData(dataFromSingleSelect);

    // setSavedData(savedAssignmentData)
    // setDisableQuestionSet(true)
    props.finalDataSetFromChild(savedAssignmentData)
    props.closeModal()
  };

  console.log("savedData - ", savedData);

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ borderBottom: "none" }} closeButton>
          <Modal.Title
            style={{
              font: "normal normal bold 22px/34px Roboto",
              position: "relative",
              left: "40%",
            }}
          >
            Add Question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "aqua", borderRadius: "7px" }}>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <div className="assignmentSectionOuter">
                <Row>
                  <Col md={12}>
                    <Select
                      placeholder="Select Question Type"
                      options={questionTypeOptions}
                      isSearchable={false}
                      onChange={(e) => setQuestionType(e.value)}
                    />
                  </Col>
                  <Col md={12} style={{ marginTop: "30px" }}>
                    {questionType === "fill_in_the_blanks" && (
                      <div>
                        <Row>
                          <Col md={12}>
                            <input
                              type="text"
                              placeholder="Add Question"
                              className="fillBlankQuest"
                              onChange={(e) => handleQuestionData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <input
                              type="text"
                              placeholder="Add Marks"
                              className="fillBlankQuest"
                              onChange={(e) => handleMarksData(e)}
                            ></input>
                          </Col>
                          <Col md={8}>
                            <input
                              type="text"
                              placeholder="Correct Answer"
                              className="correctAnsInput"
                              onChange={(e) => handleCorrectAnswer(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row className="addFillBlankSection">
                          
                          <Col md={2}>
                            <Button
                              varient="outline-primary"
                              onClick={saveFillBlankAssignment}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {questionType === "multiple_choice(checkbox)" && (
                      <div>
                        <Row>
                          <Col md={12}>
                            <input
                              type="text"
                              placeholder="Add Question"
                              className="fillBlankQuest"
                              onChange={(e) =>
                                setMultiQuestionText(e.target.value)
                              }
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                        <Col md={4}>
                            <input
                              type="text"
                              placeholder="Add Marks"
                              className="fillBlankQuest"
                              onChange={(e) => handleMarksData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <Row>
                              <Col md={12}>
                                {multipleAnswerOptions?.map((ansOpt, indx) => {
                                  return (
                                    <div
                                      disabled={disableQuestionSet}
                                      key={indx}
                                    >
                                      <Row className="addSingleSelect">
                                        <Col md={10}>
                                          <input
                                            disabled={
                                              multiQuestionText?.length == 0
                                            }
                                            type="text"
                                            placeholder={`Option ${indx + 1}`}
                                            className="correctAnsInput"
                                            onChange={(e) =>
                                              handleMultiInputChange(e, indx)
                                            }
                                          ></input>
                                        </Col>
                                        {multipleAnswerOptions.length != 1 && (
                                          <Col md={2}>
                                            <Button
                                              variant="danger"
                                              onClick={deleteMultiOptions}
                                            >
                                              -
                                            </Button>
                                          </Col>
                                        )}
                                      </Row>
                                    </div>
                                  );
                                })}
                              </Col>
                              {/* <Col md={2}></Col> */}
                            </Row>
                          </Col>
                          <Col md={4} style={{ paddingLeft: "48px" }}>
                            <Row style={{ marginBottom: "10px" }}>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    multiQuestionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="primary"
                                  onClick={addMultiOptions}
                                >
                                  Add Options
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    multiQuestionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="success"
                                  onClick={saveMultiAssignment}
                                >
                                  Submit
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {questionType === "multiple_choice(radio)" && (
                      <div>
                        <Row>
                          <Col md={12}>
                            <input
                              type="text"
                              placeholder="Add Question"
                              className="fillBlankQuest"
                              onChange={(e) => setQuestionText(e.target.value)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                        <Col md={4}>
                            <input
                              type="text"
                              placeholder="Add Marks"
                              className="fillBlankQuest"
                              onChange={(e) => handleMarksData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <Row>
                              <Col md={12}>
                                {answerOptions?.map((ansOpt, indx) => {
                                  return (
                                    <div
                                      disabled={disableQuestionSet}
                                      key={indx}
                                    >
                                      <Row className="addSingleSelect">
                                        <Col md={10}>
                                          <input
                                            disabled={questionText?.length == 0}
                                            type="text"
                                            placeholder={`Option ${indx + 1}`}
                                            className="correctAnsInput"
                                            onChange={(e) =>
                                              handleInputChange(e, indx)
                                            }
                                          ></input>
                                        </Col>
                                        {answerOptions.length != 1 && (
                                          <Col md={2}>
                                            <Button
                                              variant="danger"
                                              onClick={deleteOptions}
                                            >
                                              -
                                            </Button>
                                          </Col>
                                        )}
                                      </Row>
                                    </div>
                                  );
                                })}
                              </Col>
                              {/* <Col md={2}></Col> */}
                            </Row>
                          </Col>
                          <Col md={4} style={{ paddingLeft: "48px" }}>
                            <Row style={{ marginBottom: "10px" }}>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    questionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="primary"
                                  onClick={addOptions}
                                >
                                  Add Options
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    questionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="success"
                                  onClick={saveSingleOptionAssignment}
                                >
                                  Submit
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {questionType === "subjective" && (
                      <div>
                        <Row>
                          <Col md={12}>
                            <input
                              type="text"
                              placeholder="Add Question"
                              className="fillBlankQuest"
                              onChange={(e) => handleSubjectiveQuestionData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                        <Col md={4}>
                            <input
                              type="text"
                              placeholder="Add Marks"
                              className="fillBlankQuest"
                              onChange={(e) => handleMarksData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row className="addFillBlankSection">
                          <Col md={10}></Col>
                          <Col md={2}>
                            <Button
                              varient="outline-primary"
                              onClick={saveSubjectiveAssignment}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {questionType === "unjumble" && (
                      <div>
                        <Row>
                          <Col md={12}>
                            <input
                              type="text"
                              placeholder="Add Question"
                              className="fillBlankQuest"
                              onChange={(e) =>
                                setUnJumbleQuestionText(e.target.value)
                              }
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                        <Col md={4}>
                            <input
                              type="text"
                              placeholder="Add Marks"
                              className="fillBlankQuest"
                              onChange={(e) => handleMarksData(e)}
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <Row>
                              <Col md={12}>
                                {answerJumbleOptions?.map((ansOpt, indx) => {
                                  return (
                                    <div
                                      disabled={disableQuestionSet}
                                      key={indx}
                                    >
                                      <Row className="addSingleSelect">
                                        <Col md={10}>
                                          <input
                                            disabled={
                                              unJumblequestionText?.length == 0
                                            }
                                            type="text"
                                            placeholder={`Option ${indx + 1}`}
                                            className="correctAnsInput"
                                            onChange={(e) =>
                                              handleJumbleInputChange(e, indx)
                                            }
                                          ></input>
                                        </Col>
                                        {answerJumbleOptions.length != 1 && (
                                          <Col md={2}>
                                            <Button
                                              variant="danger"
                                              onClick={deleteJumbleOptions}
                                            >
                                              -
                                            </Button>
                                          </Col>
                                        )}
                                      </Row>
                                    </div>
                                  );
                                })}
                              </Col>
                              {/* <Col md={2}></Col> */}
                            </Row>
                          </Col>
                          <Col md={4} style={{ paddingLeft: "48px" }}>
                            <Row style={{ marginBottom: "10px" }}>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    unJumblequestionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="primary"
                                  onClick={addUnJumbleOptions}
                                >
                                  Add Options
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                <Button
                                  disabled={
                                    unJumblequestionText?.length == 0 ||
                                    disableQuestionSet
                                  }
                                  variant="success"
                                  onClick={saveUnJumbleAssignment}
                                >
                                  Submit
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddQuestionSet;
