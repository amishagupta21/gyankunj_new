import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { createLogBook, getSubjectsList, getGradeDetails } from "../../../ApiClient";

const AddLogBook = (props) => {
  const [grade, setGrade] = useState("");
  const [gradeData, setGradeData] = useState([])
  const [subject, setSubject] = useState("");
  const [teacherName, setTeacherName] = useState();
  const [periodData, setPeriodData] = useState('')
  const [section, setSection] = useState("");
  const [contentTaught, setContentTaught] = useState('')
  const [homework, setHomework] = useState('')
  const [allSubjectDetails, setAllSubjectDetails] = useState([])

  useEffect(() => {
    getAllSubjectsData()
    getAllGradeDetails()
  },[])

  const userDetails = JSON.parse(localStorage.getItem('UserData'))

  const gradeOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  const subjectOptions = [
    { value: "1", label: "History" },
    { value: "2", label: "Geography" },
    { value: "3", label: "Hindi" },
    { value: "4", label: "English" },
  ];

  const teacherOptions = [
    { value: "Julie", label: "Julie" },
    { value: "S.K. Tripathy", label: "S.K. Tripathy" },
    { value: "Khan Sir", label: "Khan Sir" },
  ];

  const periodOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" }
  ];

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const handleGradeChange = (e) => {
    setGrade(e.target.value)
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value)
  }

  const handlePeriodChange = (e) => {
    setPeriodData(e.target.value)
  }

  const handleSectionChange = (e) => {
    setSection(e.value)
  }

  const getAllSubjectsData = () => {
    getSubjectsList()
    .then((res) => {
      setAllSubjectDetails(res.data)
    })
  }

  console.log("props - ", props)

  const addLogBookData = () => {
    // const today = new Date()
    //     const dd = String(today.getDate()).padStart(2, '0');
    //     const mm = String(today.getMonth() + 1).padStart(2, '0');
    //     const yyyy = today.getFullYear();
    //     const newData = `${yyyy}-${mm}-${dd}`
    const logbookDetails = {
      "grade_id": grade,
      "section_id": section,
      "period": periodData,
      "subject_id": subject,
      "teacher_id": userDetails.user_id,
      "content_taught": contentTaught,
      "home_work": homework,
      // "date": newData
    }
    createLogBook(logbookDetails)
    .then((res) => {console.log("Logbook added - ", res.data)
    props.closeAndLoad()})
    .catch((err) => console.log("Logbook Error - ", err))
  }

  const getAllGradeDetails = () => {
    getGradeDetails()
    .then((res) => setGradeData(res.data))
    .catch((err) => console.log(err))
    }

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
          <Modal.Title style={{font: 'normal normal bold 22px/34px Roboto'}}>Add LogBook</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={5}>
              <h6 style={{font: 'normal normal bold 16px/34px Roboto'}}>Add Grade</h6>
                <select className="addLogBookBlock" name="grade" id="grade" onChange = {(e) => handleGradeChange(e)}>
                <option value="">--Grade--</option>
                {gradeData?.grade_details?.grade_details?.map((grade) => {
                      // console.log("grade - ", grade)
                      return (
                        <option value={grade?.grade_id}>
                          {grade?.grade_id}
                        </option>
                      );
                    })}
                </select>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label><h6 style={{font: 'normal normal bold 16px/34px Roboto'}}>Content Taught</h6></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Add Content Taught"
                    
                  onChange={(e) => setContentTaught(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={5}>
              <h6 style={{font: 'normal normal bold 16px/34px Roboto'}}>Add Section</h6>
                {/* <Select
                  options={sectionOptions}
                  onChange={(e) => handleSectionChange(e)}
                /> */}
                <select className="addLogBookBlock" name="section" id="section" onChange = {(e) => handleSectionChange(e)}>
                <option value="">--Section--</option>
                  {sectionOptions?.map((section) => {
                    return <option value={section.value}>{section.label}</option>
                  })}
                </select>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label><h6 style={{font: 'normal normal bold 16px/34px Roboto'}}>Add Homework</h6></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter Homework given"
                    // value={grade}
                  onChange={(e) => setHomework(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{marginTop: "32px"}}>
              <Col md={5}>
              <h6>Add Subject</h6>
                <select className="addLogBookBlock" name="subject" id="subject" onChange = {(e) => handleSubjectChange(e)}>
                <option value="">--Subject--</option>
                  {allSubjectDetails?.subjects?.map((subject) => {
                    return <option value={subject?.subject_id}>{subject?.subject_name}</option>
                  })}
                </select>
              </Col>
              
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="outline-primary" style={{ alignItems: "center" }} onClick={resetData}>
            Reset
          </Button> */}
          <Button variant="outline-primary" onClick={addLogBookData} disabled = {!(grade && section && periodData, subject && contentTaught && homework)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLogBook;
