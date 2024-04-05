import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, Table } from "react-bootstrap";
import Select from 'react-select'
import { createMasterRoutine, getTeachersData, getSubjectsList, getGradeDetails } from '../../../ApiClient'
import './MasterRoutine.css'
import {v4 as uuid} from 'uuid';
import AsyncSelect from 'react-select/async';
import { FaTrashAlt } from "react-icons/fa";



const AddRoutine = (props) => {

  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [periodData, setPeriodData] = useState('')
  const [section, setSection] = useState('')
  const [dayData, setDayData] = useState('')
  const [dataToAddRoutine, setDataToAddRoutine] = useState([])
  const [enableSubmitButton, setEnableSubmitButton] = useState(false)
  const [teacherData, setTeacherData] = useState({})
  const [selectedValue, setSelectedValue] = useState(null);
  const [allSubjectDetails, setAllSubjectDetails] = useState([])
  const [gradeData, setGradeData] = useState([]);



  useEffect(() => {
    getAllTeachersData()
    getAllSubjectsData()
    getAllGradeDetails()
  },[grade, section])

  const resetForm = () => {
    setGrade('')
    setSection('')
    setDayData('')
  }

  const getAllTeachersData = () => {
    getTeachersData()
    .then((res) => {
      setTeacherData(res.data)
    })
  }

  const getAllSubjectsData = () => {
    getSubjectsList()
    .then((res) => {
      setAllSubjectDetails(res.data)
    })
  }

  const gradeOptions = [
   {value: "1", label: 1},
   {value: "2", label: 2},
   {value: "3", label: 3},
   {value: "4", label: 4},
   {value: "5", label: 5},
   {value: "6", label: 6},
   {value: "7", label: 7},
   {value: "8", label: 8},
   {value: "9", label: 9},
   {value: "10", label: 10},
  ]

  const sectionOptions = [
    { value: '1', label: 'A' },
    { value: '2', label: 'B' },
    { value: '3', label: 'C' },
    { value: '4', label: 'D' }
  ]
 
  const subjectOptions = [
    { value: '1', label: 'History' },
    { value: '2', label: 'Geography' },
    { value: '3', label: 'Hindi' },
    { value: '4', label: 'English' }
  ]

  const periodOptions = [
    {value: "1", label: 1},
   {value: "2", label: 2},
   {value: "3", label: 3},
   {value: "4", label: 4},
   {value: "5", label: 5},
   {value: "6", label: 6},
   {value: "7", label: 7},
   {value: "8", label: 8}
  ]

  const dayOption = [
    {value: "Monday", label: "Monday"},
    {value: "Tuesday", label: "Tuesday"},
    {value: "Wednesday", label: "Wednesday"},
    {value: "Thursday", label: "Thursday"},
    {value: "Friday", label: "Friday"},
  ]



  const handleGradeChange = (e) => {
    setGrade(e.target.value)
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value)
  }

  const handleTeacherChange = (e) => {
    setTeacherName(e.target.value)
  }

  const handlePeriodChange = (e) => {
    setPeriodData(e.target.value)
  }

  const handleSectionChange = (e) => {
    setSection(e.target.value)
  }

  console.log("section - ", section)

  const handleDayChange = (e) => {
    setDayData(e.target.value)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const postRoutineData = () => {

    createMasterRoutine(dataToAddRoutine)
    .then((res) => {
      console.log("PostData - ",  res)
    })
    .catch((err) => console.log("PostData err - ",  err))
  }

  console.log("dataToAddRoutine = ", dataToAddRoutine)

  const addRoutineDetails = () => {
    let newMember = [...dataToAddRoutine];
    let newData = {
      day: dayData,
      values: [
        {
          grade_id: grade,
          period: periodData,
          subject_id: subject,
          teacher_id: teacherName,
          section_id: section
        },
      ],
    };

    newMember = [...newMember, newData];

    setDataToAddRoutine(newMember);
    setTeacherName('')

  };

  const closeAddModal = () => {
    postRoutineData();
    props.onHide();
  }

  const deleteRoutineRow = (indx) => {
    dataToAddRoutine.splice(indx, 1)
    setDataToAddRoutine([...dataToAddRoutine])
  }

  const getAllGradeDetails = () => {
    getGradeDetails()
    .then((res) => setGradeData(res.data))
    .catch((err) => console.log(err))
    }

    console.log("dataToAddRoutine - ", dataToAddRoutine)
  
  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Master Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row style={{ marginBottom: "10px" }}>
              <Col md={5} style={{paddingLeft:"25%"}}>
                <h6>Add Grade</h6>

                <select className="masterRoutineGradeView" name="grade" id="grade" onChange = {(e) => handleGradeChange(e)} disabled = {grade !== ''}>
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
              {(grade && section && dayData) && <fieldset>
                <h6>Add Period</h6>
                <select className="masterRoutineGradeView" name="period" id="period" onChange = {(e) => handlePeriodChange(e)}>
                <option value="">--Period--</option>
                  {periodOptions?.map((period) => {
                    return <option value={period.value}>{period.label}</option>
                  })}
                </select>
                </fieldset>}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
            <Col md={5} style={{paddingLeft:"25%"}}>
              {grade && <fieldset>
                <h6>Add Section</h6>
                <Form.Select
                    className="lessonPlanSubject"
                    name="section"
                    id="section"
                    style={{width:"292px"}}
                    onChange={(e) => handleSectionChange(e)}
                  >
                    <option value="">--Section--</option>
                    {sectionOptions?.map((section, indx) => {
                      return (
                        <option value={section?.value}>{section?.label}</option>
                      );
                    })}
                  </Form.Select>
                </fieldset>}
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                {(grade && section && dayData) && <fieldset>
                <h6>Add Subject</h6>
                <select className="masterRoutineGradeView" name="subject" id="subject" onChange = {(e) => handleSubjectChange(e)}>
                <option value="">--Subject--</option>
                  {allSubjectDetails?.subjects?.map((subject) => {
                    return <option value={subject?.subject_id}>{subject?.subject_name}</option>
                  })}
                </select>
                </fieldset>}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col md={5} style={{paddingLeft:"25%"}}>
                {section && <fieldset>
              <h6>Add Week Day</h6>
                <select className="masterRoutineGradeView" name="day" id="day" onChange = {(e) => handleDayChange(e)} disabled = {dayData !== ''}>
                <option value="">--Week Day--</option>
                  {dayOption?.map((day) => {
                    return <option value={day.value}>{day.label}</option>
                  })}
                </select>
                </fieldset>}
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
              {(grade && section && dayData) && <fieldset>
              <h6>Teacher Name</h6>
                <select className="masterRoutineGradeView" name="teacher" id="teacher" onChange = {(e) => handleTeacherChange(e)}>
                <option value="">--Teacher--</option>
                  {teacherData?.teachers?.map((teacher) => {
                    return <option value={teacher.teacher_id}>{teacher.teacher_name}</option>
                  })}
                </select>
                </fieldset>}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col md={9}></Col>
              <Col md={3}>
                <Button
                  variant="outline-success"
                  type="submit"
                  onClick={(e) => addRoutineDetails()}
                  disabled={!(periodData && teacherName && subject)}
                >
                  Add to Master Routine
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Table striped bordered hover>
                  <thead>
                    <tr className="MRTableHeader">
                      <th>Grade</th>
                      <th>Section</th>
                      <th>Period</th>
                      <th>Teacher Name</th>
                      <th>Subject Name</th>
                      <th>Weekday</th>
                      <th></th>
                    </tr>
                  </thead>
                  {dataToAddRoutine?.map((data, indx) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{data?.values[0].grade_id}</td>
                          <td>{data?.values[0].section_id}</td>
                          <td>{data?.values[0].period}</td>
                          <td>{data?.values[0].teacher_id}</td>
                          <td>{data?.values[0].subject_id}</td>
                          <td>{data?.day}</td>
                          <td>
                            {/* <Button variant="primary">Edit</Button>
                            <Button
                              variant="danger"
                              style={{ position: "relative", left: "40px" }}
                              onClick={() => deleteRoutineRow(indx)}
                            >
                              Delete
                            </Button> */}
                            <FaTrashAlt style={{ position: "relative", left: "25px", cursor:"pointer" }} onClick={() => deleteRoutineRow(indx)} />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" style={{ alignItems: "center" }} onClick={resetForm}>
            Reset
          </Button>
          <Button variant="outline-primary" onClick={closeAddModal} disabled={dataToAddRoutine?.length < 8}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRoutine;
