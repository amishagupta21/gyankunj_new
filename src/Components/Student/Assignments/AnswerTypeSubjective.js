import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap";
import './studentAssignment.css'

const AnswerTypeSubjective = (props) => {

  const [validated, setValidated] = useState(false);
  const [testanswer,setTestAnswer] = useState("");
  useEffect(() => {
    setTestAnswer(props.question.test_answer);
  },[])


  const handleChange = (e) => {
    setTestAnswer(e.target.value);
  }
  const handleCancel = () => {
    setTestAnswer("");
    setValidated(false)
  }

  const handleSave = (e) => {
    const form = document.getElementById("form");
    console.log(form)
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else {
      let data = {
        type: "4",
        question: props.question.question,
        all_options: props.question.all_options,
        marks: props.question.marks,
        correct_answer: props.question.correct_answer
        
      }
      console.log("Data",data)
      props.handle(data,props.idx);
    }
    setValidated(true);
  }


  return (
    <>
      <Row>
        <Col md={12} style={{
          background: "#7A9ABF 0% 0% no-repeat padding-box",
          borderRadius: "4px 4px 0px 0px",
          opacity: "1",
        }}><h2>Question:{props.question.question}</h2></Col>
      </Row>
      <br />
      <Row>
        <Col md={9}>
          <Form id="form" noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><h6>Correct Answer</h6></Form.Label>
              <Form.Control as="textarea" rows={5} value={testanswer} onChange={e => handleChange(e)} required />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={9}></Col>
        <Col md={3}>
          <Row>
            <Col md={6}>
              <Button variant='outline-primary' onClick={handleCancel}>Cancel</Button>
            </Col>
            <Col md={6}>
              <Button variant='primary' onClick={handleSave}>Save</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default AnswerTypeSubjective