import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";
import CustomToast from "./Toast";
import {
  getLessonPlanMetadata,
  getGradeDetails,
  createAssignment,
} from "../../../ApiClient";
import "./createAssignment.css";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    message: "",
  });
  const userDetails = JSON.parse(localStorage.getItem("UserData"));
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentGrade, setAssignmentGrade] = useState("");
  const [gradeDetailList, setGradeDetailList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [section, setSection] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  // const [subject, setSubject] = useState({});
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("0");
  const [chapter, setChapter] = useState("");
  const assignmentTypes = [
    { value: "1", label: "Class Work" },
    { value: "2", label: "Home Work" },
    { value: "3", label: "Test" },
  ];
  const [firstTwoFieldsCompleted, setFirstTwoFieldsCompleted] = useState(false);
  const [secondFieldCompleted, setSecondFieldCompleted] = useState(false);
  const [thirdFieldCompleted, setThirdFieldCompleted] = useState(false);
  const [subject, setSubject] = useState(null);

  const [fourthFieldCompleted, setFourthFieldCompleted] = useState(false);
  const [fifthFieldCompleted, setFifthFieldCompleted] = useState(false);

  useEffect(() => {
    setFirstTwoFieldsCompleted(assignmentName !== "" && assignmentGrade !== "");
  }, [assignmentName, assignmentGrade]);

  useEffect(() => {
    setSecondFieldCompleted(section !== "");
  }, [section]);

  useEffect(() => {
    setThirdFieldCompleted(subject !== null);
  }, [subject]);

  useEffect(() => {
    setFourthFieldCompleted(chapter !== "");
  }, [chapter]);

  useEffect(() => {
    setFifthFieldCompleted(
      type !== "" && (type !== "3" || (type === "3" && duration !== "0"))
    );
  }, [type, duration]);

  useEffect(() => {
    GradeDetails();
  }, []);

  const GradeDetails = () => {
    getGradeDetails().then((res) => {
      setGradeDetailList(res?.data?.grade_details?.grade_details);
    });
  };

  const handleAssignmentName = (e) => {
    setAssignmentName(e.target.value);
  };

  const handleAssignmentGrade = (e) => {
    var sections;
    for (let i = 0; i < gradeDetailList.length; i++) {
      if (gradeDetailList[i].grade_id == e.target.value) {
        sections = gradeDetailList[i].section_list;
        break;
      }
    }
    setSectionList(sections);
    setAssignmentGrade(e.target.value);
  };

  const handleSection = async (e) => {
    const selectionId = e.target.value;
    var subjects = await getLessonPlanMetadata(assignmentGrade, selectionId);
    setSubjectList(subjects?.data?.metadata);
    setSection(selectionId);
  };

  const handleSubject = (e) => {
    for (let i = 0; i < subjectList.length; i++) {
      if (subjectList[i].subject_name == e.target.value) {
        setSubject(subjectList[i]);
        return;
      }
    }
    setSubject({});
    return;
  };

  const handleChapter = (e) => {
    setChapter(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handledurationb = (e) => {
    setDuration(e.target.value);
  };

  const handleCreate = async () => {
    const data = {
      teacher_id: userDetails?.user_id,
      assignment_name: assignmentName,
      chapter_id: chapter,
      assignment_type_id: type,
      assignment_duration: duration,
    };
    const res = await createAssignment(data);
    navigate("/teacherDashboard/assignments");
  };

  const handlequestion = () => {
    if (type == "3" && duration == "0") {
      setData({
        name: "Create Assignment Error",
        message: "You must input the duration of the Test",
      });
      setShow(true);
    } else {
      const data = {
        teacher_id: userDetails?.user_id,
        assignment_name: assignmentName,
        chapter_id: chapter,
        assignment_type_id: type,
        assignment_duration: parseInt(duration),
      };
      const res = createAssignment(data)
        .then((res) =>
          navigate("/teacherDashboard/addquestions", {
            state: res.data.assignment_id,
          })
        )
        .catch((res) => navigate("/teacherDashboard/assignments"));
    }
  };

  return (
    <div className="create-assignment-container">
      <div className="create-assignment-content">
        <div className="border-bottom d-flex justify-content-between mt-5 py-2">
          <h4>Create Assignment</h4>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/teacherDashboard/assignments")}
          >
            Go to Assignments
          </Button>
        </div>

        <Form className="assignment-form">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Assignment Name"
                  onChange={(e) => handleAssignmentName(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Grade</Form.Label>
                <Form.Select
                  name="grade"
                  onChange={(e) => handleAssignmentGrade(e)}
                >
                  <option value="">--Grade--</option>
                  {gradeDetailList?.map((grade) => (
                    <option value={grade.grade_id} key={grade.grade_id}>
                      {grade.grade_id}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {firstTwoFieldsCompleted && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fromSelectionId">
                    <Form.Label>Select Section</Form.Label>
                    <Form.Control
                      as="select"
                      className="lessonPlanSubject"
                      value={section}
                      disabled={assignmentGrade ? false : true}
                      onChange={(e) => handleSection(e)}
                    >
                      <option value="">--Section--</option>
                      {sectionList?.map((section) => (
                        <option
                          value={section.section_id}
                          key={section.section_id}
                        >
                          {section.section_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Subject</Form.Label>
                    <Form.Control
                      className="lessonPlanSubject"
                      as="select"
                      name="subject"
                      onClick={(e) => handleSubject(e)}
                    >
                      <option value="">--Subject--</option>
                      {subjectList?.map((subject) => (
                        <option
                          key={subject.subject_id}
                          value={subject.subject_name}
                        >
                          {subject.subject_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
          <Row className="mb-3">
            {secondFieldCompleted && (
              <>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Chapter Number</Form.Label>
                    <Form.Control
                      className="lessonPlanSubject"
                      as="select"
                      name="chapter"
                      value={chapter}
                      onChange={(e) => handleChapter(e)}
                    >
                      <option value="">--Chapter--</option>
                      {subject ? (
                        <option
                          key={subject.chapter_id}
                          value={subject.chapter_id}
                        >
                          {subject.chapter_number}
                        </option>
                      ) : (
                        <></>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Assignment Type</Form.Label>
                    <Form.Select name="type" onChange={(e) => handleType(e)}>
                      <option value="">--Type--</option>
                      {assignmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {type === "3" && (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        type="duration"
                        placeholder="Enter Duration"
                        value={duration}
                        onChange={(e) => handledurationb(e)}
                      />
                    </Form.Group>
                  )}
                </Col>
              </>
            )}
          </Row>

          {/* {thirdFieldCompleted && (
                        <>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Row>
                                    <Col md={3}>
                                        <Form.Label>Chapter Number</Form.Label>
                                    </Col>
                                    <Col md={9}>
                                        <Form.Control
                                            className="lessonPlanSubject"
                                            as="select"
                                            name="chapter"
                                            value={chapter}
                                            onChange={(e) => handleChapter(e)}
                                        >
                                            <option value="">--Chapter--</option>
                                            {subject ? (
                                                <option key={subject.chapter_id} value={subject.chapter_id}>{subject.chapter_number}</option>
                                            ) : (
                                                <></>
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </>
                    )}

                    {fourthFieldCompleted && (
                        <>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Row>
                                    <Col md={3}>
                                        <Form.Label>Assignment Type</Form.Label>
                                    </Col>
                                    <Col md={9}>
                                        <Form.Select
                                            name="type"
                                            onChange={e => handleType(e)}
                                        >
                                            <option value="">--Type--</option>
                                            {assignmentTypes.map((type) => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </>
                    )} */}

          {/* {fifthFieldCompleted && (
                        <>
                           {type === "3" && (
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Duration</Form.Label>
        <Form.Control
            type="duration"
            placeholder="Enter Duration"
            value={duration}
            onChange={(e) => handledurationb(e)}
        />
    </Form.Group>
)}

                        </>
                    )} */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outline-primary"
              onClick={() => handleCreate()}
              disabled={
                !(
                  assignmentTypes &&
                  section &&
                  chapter &&
                  subject &&
                  type &&
                  assignmentName &&
                  assignmentGrade &&
                  duration
                )
              }
              style={{ cursor: "pointer" }}
              className="custom-hover"
            >
              Save & Draft
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handlequestion()}
              disabled={
                !(
                  assignmentTypes &&
                  section &&
                  chapter &&
                  subject &&
                  type &&
                  assignmentName &&
                  assignmentGrade &&
                  duration
                )
              }
              style={{ cursor: "pointer" }}
              className="custom-hover"
            >
              Save & Add Question
            </Button>
          </div>
        </Form>

        <CustomToast show={show} setShow={setShow} data={data} />
      </div>
    </div>
  );
};

export default CreateAssignment;
