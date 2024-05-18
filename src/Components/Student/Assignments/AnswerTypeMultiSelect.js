import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import './studentAssignment.css'

const AnswerTypeMultiSelect = (props) => {
  const [validated, setValidated] = useState(false);
  const [testanswer,setTestAnswer] = useState(props.question.test_answer);
  const handleCancel = () => {

  }

  const handleSave = (data,idx) => {

  }

  const handleChange = (e) => {
    console.log(e.target.value);
  }
  console.log("props", props)
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
      <Form id="form" noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          {props.question.all_options.map((item,index) => (
            <>
              <Form.Check // prettier-ignore
                type="checkbox"
                value={index}
                label={item}
                style={{
                  fontSize : "20px"
                }}
                onChange={(e) => handleChange(e)}
              />
            </>
          ))}
        </Form.Group>
      </Form>
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

export default AnswerTypeMultiSelect