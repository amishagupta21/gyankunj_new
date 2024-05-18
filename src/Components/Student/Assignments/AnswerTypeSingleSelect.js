import React from 'react'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import './studentAssignment.css'
import { useState } from 'react';

const AnswerTypeSingleSelect = ({...props}) => {

  const [singleValueAnswer, setSingleValueAnswer] = useState('')

  const handleSingleOptionChange = (e) => {
    setSingleValueAnswer(e.target.value)
  }

  console.log("singleValueAnswer - ", singleValueAnswer)


    return (
      <>
            <Row>
              <Col md={9} className="questionSetHeaderText">
                <p>Choose Any One</p>
              </Col>
            </Row>

            {props?.assignmentFullData?.assignment_data?.assignmentDataForStudent?.map((singleChoice, indx) => {
              return singleChoice?.type === "multiple_choice(radio)" &&  (<div><Row>
                <Col md={10} className="questionSetHeader">
                  <p className="questionSetText">{singleChoice?.question}</p>
                </Col>
                <Col md={2}>
                  <p className="questionSetText">20 marks</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form>
                    {singleChoice?.all_options?.map((option) => {
                      return <div className="mb-3">
                      {/* <Form.Check
                        type="radio"
                        value={option}
                        label={option}
                      /> */}
                      <input type="radio" id="html" name="fav_language" value={option} onChange={(e) => handleSingleOptionChange(e)}></input>
                        <label for="html">{option}</label>
                    </div>
                    }) }
                  </Form>
                </Col>
              </Row>
              <hr /></div>)
            })
           }
      </>
    );
}

export default AnswerTypeSingleSelect