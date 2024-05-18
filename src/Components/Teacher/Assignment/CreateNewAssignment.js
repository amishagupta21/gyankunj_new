import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import {
  getLessonPlanMetadata,
  getGradeDetails,
  createAssignment,
} from "../../../ApiClient";

const CreateNewAssignment = (props) => {
  const [verifyAndClose, setVerifyAndClose] = useState(false);
  const [grade, setGrade] = useState("");
  const [gradeData, setGradeData] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [lessonMetadata, setLessonMetadata] = useState([]);
  const [chapterNumber, setChapterNumber] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [assignmentName, setAssignmentname] = useState("");

  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  useEffect(() => {
    lessonPlanMetadata();
  }, [grade && sectionData]);

  useEffect(() => {
    getAllGradeDetails();
  }, []);

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
    // setSectionData(gradeData?.grade_details?.grade_details?.find((grade) => grade?.grade_id === e.target.value).sectionData)
  };

  const handleAssignmentName = (e) => {
    setAssignmentname(e.target.value);
  };

  const handleAssignmentType = (e) => {
    console.log(e.target.value)
    setAssignmentType(e.target.value);
  };

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const assignmentTypes = [
    { value: "1", label: "Class Work" },
    { value: "2", label: "Home Work" },
    { value: "3", label: "Test" },
  ];

  const lessonPlanMetadata = () => {
    const grade_id = grade;
    const section_id = sectionData;
    getLessonPlanMetadata(grade_id, section_id)
      .then((res) => setLessonMetadata(res.data))
      .catch((err) => console.log("metadata err - "));
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

  const createAssignmentData = () => {
    const postData = {
      teacher_id: userDetails?.user_id,
      assignment_name: assignmentName,
      chapter_id: chapterNumber,
      assignment_type_id: assignmentType,
    };
    createAssignment(postData)
      .then((res) => props.onHide())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{font: "normal normal bold 22px/34px Roboto"}}>Create Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={5}>
                <Form.Group className="mb-3" controlId="teacherId">
                  <Form.Label>Teacher Name</Form.Label> <br />
                  {/* <Form.Control type="Teacher" placeholder="Enter email" /> */}
                  <Form.Text className="text-muted">
                    {userDetails?.name}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Assignment Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Assignment Name"
                    onChange={(e) => handleAssignmentName(e)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Select grade</Form.Label>
                  <Form.Select
                    className="lessonPlanSubject"
                    name="grade"
                    id="grade"
                    onChange={(e) => handleGradeChange(e)}
                  >
                    <option value="">--Grade--</option>
                    {gradeData?.grade_details?.grade_details?.map((grade) => {
                      // console.log("grade - ", grade)
                      return (
                        <option value={grade?.grade_id}>
                          {grade?.grade_id}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Section</Form.Label>
                  <Form.Select
                    className="lessonPlanSubject"
                    name="section"
                    id="section"
                    onChange={(e) => setSectionData(e.target.value)}
                  >
                    <option value="">--Section--</option>
                    {sectionOptions?.map((section, indx) => {
                      return (
                        <option value={section?.value}>{section?.label}</option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Chapter Number</Form.Label>
                  <Form.Select
                    className="lessonPlanSubject"
                    name="section"
                    id="section"
                    onChange={(e) => setChapterNumber(e.target.value)}
                    // disabled={!(grade && sectionData)}
                  >
                    <option value="">--Chapter--</option>
                    {lessonMetadata?.status == "success" &&
                      lessonMetadata?.metadata?.map((chapter) => {
                        console.log("chapter - ", chapter);
                        return (
                          <option value={chapter.chapter_id}>
                            {chapter.chapter_number}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Assignment Type</Form.Label>
                  <Form.Select onChange={(e) => handleAssignmentType(e)}>
                    <option value="">--Type--</option>
                    {assignmentTypes?.map((type) => {
                      return <option value={type?.value}>{type?.label}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="outline-primary" style={{ alignItems: "center" }} onClick={resetData}>
            Reset
          </Button> */}
          <Button variant="outline-primary" onClick={() => props.onHide()}>Cancel</Button>
          <Button variant="outline-primary" onClick={createAssignmentData} disabled={!(grade && sectionData && chapterNumber && assignmentType && assignmentName)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewAssignment;
