import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import './studentAssignment.css'

const AnswerTypeFillTheBlank = ({...props}) => {

  const [blankData, setBlankData] = useState('')
  const [answerFromBlank, setAnswerFromBlank] = useState([])
  const [questionType, setQuestionType] = useState('')
  const [questionData, setQuestionData] = useState('')
  const [questionMarks, setQuestionMarks] = useState('')

  useEffect(() => {
    arrangeQuestion()
  },[])

  const handleBlankAnswer = (e) => {
    setBlankData(e.target.value)
    // props.getAnswerFromChild(e.target.value)
    assignmentDataFinal()
  }

  const arrangeQuestion = () => {
    props?.assignmentFullData?.map((quest, indx) => {
      return (
        setQuestionType(quest.type),
        setQuestionData(quest.question),
        setQuestionMarks(quest.marks)


      )
    })
  }

  console.log("questionType - ", questionType, questionData, questionMarks)
  

  const assignmentDataFinal = (finalData) => {
    let answeredData = [...answerFromBlank]
    let newAnswerDataSet = {
          "type": questionType,
          "question": questionData,
          "selected_answer": blankData,
          "correct_answer": "",
          "all_options": [],
          "marks": questionMarks
}
answeredData = [...answeredData, newAnswerDataSet]
setAnswerFromBlank(answeredData)
}

console.log("answerFromBlank - ", answerFromBlank)




  console.log("blankData - ", props)
 
    return (
      <>
        {/* <Row> */}
          {/* <Col md={4} className="questionSetSidebar">
            {" "}
            Sidebar
          </Col> */}
          {/* <Col md={8} className="assignmentDataInner"> */}
            <Row>
              <Col md={9} className="questionSetHeaderText">
                <p>Fill in the Blanks</p>
              </Col>
            </Row>
            {props?.assignmentFullData?.map((fillInTheBlank, indx) => {
                return fillInTheBlank?.type === 'fill_in_the_blanks' && <Row>
                <Col md={10} className="questionSetHeader">
                  <p className="questionSetText">
                    {fillInTheBlank?.question}
                  </p>
                </Col>
                <Col md={2}>
                  <p className="questionSetText">{fillInTheBlank?.marks}</p>
                </Col>
              </Row>
            }) }
            <Row>
              <Col md={6}>
                <p>Enter your Answer</p>
                <input
                  type="text"
                  placeholder="Answer"
                  className="fillBlankAnswer"
                  onChange={(e) => handleBlankAnswer(e)}
                ></input>
              </Col>
            </Row>
            <hr />
          {/* </Col> */}
        {/* </Row> */}
      </>
    );
}

export default AnswerTypeFillTheBlank