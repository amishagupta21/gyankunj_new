import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import {  saveLessonPlan, getLessonPlanMetadata, getGradeDetails, SaveAssignmentData, publishAssignmentData } from "../../../ApiClient";
import './assignment.css'
import AddQuestionSet from "./AddQuestionSet";
import {FaAngleDown} from 'react-icons/fa';
import {FaAngleUp} from 'react-icons/fa';

const SaveAssignment = (props) => {

    const [fullscreen, setFullscreen] = useState(true);
    const [questionType, setQuestionType] = useState('')
    const [assignmentDataForStudent, setAssignmentDataForStudent] = useState([])
    const [assignmentFinalQuestionData, setAssignmentFinalQuestionData] = useState([])
    const [questionData, setQuestionData] = useState(false)
    const [questionSetData, setQuestionSetData] = useState([])
    const [grade, setGrade] = useState('');
    const [gradeData, setGradeData] = useState([])
    const [sectionData, setSectionData] = useState('');
    const [hideResponse, setHideResponse] = useState([])
    const [sectionExpanded, setSectionExpanded] = useState(false)
    const [enablePublish, setEnablePublish] = useState(false)

    useEffect(() => {
      getAllGradeDetails();
    }, []);

    const questionTypeOptions = [
        { value: "fill_in_the_blanks", label: "Fill in the blanks" },
        { value: "multiple_choice(radio)", label: "Single Select" },
        { value: "multiple_choice(checkbox)", label: "Multiple Choice" },
        { value: "subjective", label: "Subjective" },
        { value: "unjumble", label: "Unjumble the word" },
    ]

    const sectionOptions = [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" },
      { value: "4", label: "D" },
    ];

    const handleGradeChange = (e) => {
      setGrade(e.target.value);
    };

    const addQuestionSetData = () => {
      setQuestionData(true)
    }

    const finalDataSetFromChild = (finalData) => {
      setQuestionSetData(finalData)
      assignmentDataFinal(finalData)
    }

    const closeAndLoad = () => {
      setQuestionData(false)
      // assignmentDataFinal()
      // finalDataSetFromChild()
    }

    const getAllGradeDetails = () => {
      getGradeDetails()
        .then((res) => setGradeData(res.data))
        .catch((err) => console.log(err));
    };

    const assignmentDataFinal = (finalData) => {
      let newAssignmentData = [...assignmentDataForStudent]
      let newQuestionSet = {
            "type": finalData?.type,
            "question": finalData?.question,
            "correct_answer": finalData?.correct_answer,
            "all_options": finalData?.all_options,
            "marks": `${finalData?.marks} Marks`
  }
  newAssignmentData = [...newAssignmentData, newQuestionSet]
  setAssignmentDataForStudent(newAssignmentData)
}

const showResponseHandler = (id) => {
  let openHandler = [...hideResponse];
  openHandler.push(id);
  setHideResponse([...openHandler]);
  setSectionExpanded(true);
}

const hideResponseHandler = (id) => {

  let openHandler = [...hideResponse];
  let findindex = openHandler.indexOf(id);
  setSectionExpanded(false);

  if(findindex > -1){
      openHandler.splice(findindex, 1);
      setHideResponse([...openHandler])
  }
};

const saveAssignmentModule = () => {
  const data = {
    "assignment_data":{
      assignmentDataForStudent
    },
    "assignment_id": props.assignmentIdData,
  }
  SaveAssignmentData(data)
  .then((res) => {
    setEnablePublish(true)
  })
  .catch((err) => console.log(err));
}

const publishAssignmentModule = () => {
  const assignmentId = props.assignmentIdData
  publishAssignmentData(assignmentId)
  .then((res) => {
    props.onHide()
  })
  .catch((err) => console.log("Assignment list err - ", err))
}

console.log("Save props - ", props)

  return (
    <>
    
      <Modal
        className="ModalBody"
        {...props}
        // size="xl"
        fullscreen={fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              font: "normal normal bold 22px/34px Roboto",
              alignItems: "center",
            }}
          >
            Create Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{
                      height: "74px",
                      boxShadow: "0px 3px 6px #B4B3B329",
                    }}>
            <Col md={2}>
                <h5>Grade:</h5>
                <p>{props?.assignmentGrade}</p>
              </Col>
              <Col md={2}>
              <h5>Section:</h5>
                <p>{props?.assignmentSection}</p>
              </Col>
            <Col md={4}>
              
            </Col>
            <Col md={2}>
            <Button variant="outline-primary" onClick={saveAssignmentModule} disabled={assignmentDataForStudent?.length == 0}>Save Assignment</Button>
            </Col>
            <Col md={2}>
            <Button variant="outline-primary" style={{backgroundColor: enablePublish ? "green" : "", color : enablePublish ? "white" : ""}} onClick={publishAssignmentModule} disabled = {!enablePublish}>Publish Assignment</Button>
            </Col>
          </Row>
          <Row style={{marginTop:"30px"}}>
            <Col md={3}>
              
            </Col>
            <Col md={6}>
              {assignmentDataForStudent.length > 0 ? assignmentDataForStudent?.map((questionData, indx) => {
                console.log("questionData - ", questionData)
              return (
                <Card
                  className={
                    hideResponse?.includes(indx)
                      ? "assignmentCardExpanded"
                      : "assignmentCard"
                  }
                >
                  <Card.Body>
                    <Row>
                      <Col md={10}>
                        <h6>Q{indx+1}. {questionData?.question}</h6>
                      </Col>

                      <Col md={2}>
                        {hideResponse?.includes(indx) ? (
                          <FaAngleUp
                            style={{ height: "25px", width: "25px" }}
                            onClick={() => hideResponseHandler(indx)}
                          />
                        ) : (
                          <FaAngleDown
                            style={{ height: "25px", width: "25px" }}
                            onClick={() => showResponseHandler(indx)}
                          />
                        )}
                      </Col>
                    </Row>
                    {
                      <div>
                        <fieldset>
                          <Row className="assignmentData">
                            <Col md={2} style={{ textAlign: "left" }}>
                              Marks :
                            </Col>
                            <Col md={9} style={{ textAlign: "left" }}>
                              <b>{questionData?.marks}</b>
                            </Col>
                          </Row>
                          {questionData?.all_options?.length > 0 && <Row className="assignmentData">
                            <Col md={2} style={{ textAlign: "left" }}>
                              Options:
                            </Col>
                          </Row>}
                          {questionData?.all_options?.length > 0 && questionData?.all_options?.map((option, indx) => {
                            return <div>
                          <Row className="assignmentData">
                            <Col md={6}>
                              <Button variant="success" disabled>{indx+1}. {option}</Button>
                            </Col>
                          </Row></div>
                          })}
                        </fieldset>
                      </div>
                    }
                  </Card.Body>
                </Card>
              );
              })
              
              :
              ""}
              {/* <p>{questionSetData?.type}</p>
              <p>{questionSetData?.question}</p>
              <p>{questionSetData?.marks}</p> */}
              {/* {questionSetData?.all_options?.map((option, indx) => {
               return (<input>{option}</input>)
              })} */}
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
              <Button variant="success" onClick={addQuestionSetData}>
                Add Questions
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {questionData && (
        <AddQuestionSet
        closeModal={closeAndLoad}
          show={questionData}
          onHide={() => setQuestionData(false)}
          finalDataSetFromChild={finalDataSetFromChild}
        />
      )}
    </>
  );
};

export default SaveAssignment;
