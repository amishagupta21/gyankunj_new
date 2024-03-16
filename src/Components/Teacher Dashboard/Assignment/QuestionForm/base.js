import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import TeacherSidebar from "../../TeacherSidebar";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { BsPlus, BsPlusSquareDotted } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { SaveAssignmentData } from "../../../../ApiClient";


import "./index.css";

const BaseQuestion = (props) => {
  const [cancel, setCancel] = useState(true);
  const [questionName, setQuestionName] = useState("");
  const [marks, setMarks] = useState("");
  const [type, setType] = useState("");
  const [validated, setValidated] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [other, setOther] = useState(true);
  const [fill, setfill] = useState(false);
  const [single, setSingle] = useState(false);
  const [multi, setMulti] = useState(false);
  const [multicount, setMultiCount] = useState([1, 2]);
  const [addsingle, setAddSingle] = useState(false);
  const [addmulti, setAddMulti] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isQuestionIncomplete, setIsQuestionIncomplete] = useState(false);
  const [isQuestionValid, setIsQuestionValid] = useState(true);
  const handleClose = () => {
    setDataToInitial()
    setShowQuestionModal(false);
  }
  const handleShow = () => {
    setData({
      question: "",
      marks: "",
      answer: "",
      options: [{ id: uuid(), value: "", trigger: false }],
    })
    setShowQuestionModal(true)
  };
  const [data, setData] = useState({
    question: "",
    marks: "",
    answer: "",
    options: [{ id: uuid(), value: "", trigger: false }],
  });


  useEffect(() => { }, [marks, questionName, type]);

  const setDataToInitial = () => {
    setQuestionName("");
    setMarks("");
    setType("");
    setIsQuestionIncomplete(false);
    setIsQuestionValid(true);
    setOther(true);
    setfill(false);
    setSingle(false);
    setMulti(false);
    setMultiCount([1, 2]);
    setAddSingle(false);
    setAddMulti(false);
    setShowQuestionModal(false);
    setData({
      question: "",
      marks: "",
      answer: "",
      options: [{ id: uuid(), value: "", trigger: false }],
    });
  };

  const handleSubmit = (e) => {
    debugger;
    if (fill && isQuestionIncomplete) {
      setIsQuestionValid(false);
      e.preventDefault();
      return;
    }
    const isOptionFieldEmpty = data.options.some((option) => option.value.trim() === '');

    if ((fill || single || multi) && isOptionFieldEmpty) {
      alert('Option field should not be empty!');
      e.preventDefault();
      return;
    }
    if (single && data.answer.trim() === '') {
      alert('Please select a correct answer!');
      e.preventDefault();
      return;
    }
    const form = document.getElementById("form");
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // } else {
    if (other === true) {
      const temp = {
        question: questionName,
        type: type,
        marks: marks,
        all_options: [],
        correct_answer: data.answer,
        // test_answer: "",
      };
      console.log(temp);
      props.handle(temp);
    } else if (single === true) {
      const ttt = [];
      data.options.map((item) => {
        ttt.push(item.value);
      });
      const temp = {
        question: questionName,
        type: type,
        marks: marks,
        all_options: ttt,
        correct_answer: data.answer,
        // test_answer: "",
      };
      props.handle(temp);
      console.log(temp);
    } else if (multi === true) {
      const ans = [];
      const ttt = [];
      data.options.map((item) => {
        ttt.push(item.value);
      });
      const correct_options = data.options.filter((item) => item.trigger === true);
      correct_options.map((item) => ans.push(item.value));
      const temp = {
        question: questionName,
        type: type,
        marks: marks,
        all_options: ttt,
        correct_answer: ans,
        // test_answer: [],
      };
      props.handle(temp);
      console.log(temp);
    } else if (fill === true) {
      const ans = [];
      data.options.map((item) => ans.push(item.value));
      const temp = {
        question: questionName,
        type: type,
        marks: marks,
        all_options: data.options,
        answer: ans,
      };
      console.log(temp);
      props.handle(temp);
    }
    setDataToInitial()
    setShowQuestionModal(false)

    // handleCancel();
  };
  const handleQuestionname = (e) => {
    const questionValue = e.target.value;
    setIsQuestionIncomplete(!questionValue.includes("__"));
    setQuestionName(questionValue);
    setIsQuestionValid(true);
  };
  const handleotherAnswer = (e) => {
    setData({
      ...data,
      answer: e.target.value,
    });
  };
  const handleMarks = (e) => {
    const inputValue = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(inputValue) || inputValue === "") {
      setMarks(inputValue);
    }
  };

  const addOptions = () => {
    if ((single || multi) && data.options.length !== 4) {
      const isOptionFieldEmpty = data.options.some((option) => option.value.trim() === '');

      if (isOptionFieldEmpty) {
        alert('Option field should not be empty!');
        return;
      }

      setData({
        ...data,
        options: [
          ...data?.options,
          {
            id: uuid(),
            value: "",
            trigger: false,
          },
        ],
      });
    }
  };

  const deleteOption = (id) => {
    const tempArr = data?.options.filter((item) => item.id !== id);
    setData({
      ...data,
      options: tempArr,
    });
  };
  const handleCancel = () => {
    setMarks("");
    setQuestionName("");
    setType("");
    setData({
      question: "",
      type: "",
      marks: "",
      answer: "",
      options: [{ id: uuid(), value: "", trigger: false }],
    });
    setSingle(false);
    setMulti(false);
    setfill(false);
    setOther(true);
  };
  const handleTrigger = (id) => {
    setData((prevData) => {
      const updatedOptions = prevData.options.map((option) =>
        option.id === id ? { ...option, trigger: !option.trigger } : option
      );

      return {
        ...prevData,
        options: updatedOptions,
      };
    });
  };
  const handleAnswer = (e) => {
    setData({
      ...data,
      answer: e.target.value,
    });
  };
  const handleType = (e) => {
    const selectedType = e.target.value;

    switch (selectedType) {
      case "Single Select":
        setSingle(true);
        setMulti(false);
        setfill(false);
        setOther(false);
        setType("Single Select");
        break;
      case "Multi Select":
        setSingle(false);
        setMulti(true);
        setfill(false);
        setOther(false);
        setType("Multi Select");
        break;
      case "Fill the Blank":
        setSingle(false);
        setMulti(false);
        setfill(true);
        setOther(false);
        setType("Fill the Blank");
        break;
      case "Write Answer":
        setSingle(false);
        setMulti(false);
        setfill(false);
        setOther(true);
        setType("Write Answer");
        break;
    }

    setIsQuestionValid(true);
    setIsQuestionIncomplete(false);
  };

  const handleInputChange = (index, value) => {
    const tempArr = [...data?.options];
    tempArr[index].value = value;
    setData({
      ...data,
      options: tempArr,
    });
  };
  return (
    <>
      <button type="button" class="btn btn-primary h-50" onClick={handleShow}>
        <b>+</b> New Question
      </button>
      <Modal show={showQuestionModal} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Body>
            <div className="question">
              <div className="newQuesion"> New Question</div>
              <div className="content">
                <Form noValidate validated={validated} id="form">
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          size="sm"
                          className="inputtype"
                          required
                          onChange={(e) => handleType(e)}
                          value={type}
                        >
                          <option value="">Select Type</option>
                          <option value="Single Select">Single Select</option>
                          <option value="Multi Select">Multi Select</option>
                          <option value="Fill the Blank">Fill the Blank</option>
                          <option value="Write Answer">Write Answer</option>
                        </Form.Select>

                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="marks">
                        <Form.Label>Marks</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Marks..."
                          size="sm"
                          className="inputmarks"
                          required
                          onChange={(e) => handleMarks(e)}
                          value={marks}
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={fill ? "Enter Question with __" : "Enter Question..."}
                          size="sm"
                          className={`${(!isQuestionValid || isQuestionIncomplete) ? "is-invalid" : ""}`}
                          style={{ borderColor: fill ? "red" : "blue" }}
                          onChange={(e) => handleQuestionname(e)}
                          value={questionName}
                          autoComplete="off"
                        />

                        {!isQuestionValid && isQuestionIncomplete && (
                          <Form.Control.Feedback type="invalid">
                            Question must include '__'.
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {single ? (
                    data?.options.map((item, i) => (
                      <>
                        <Row>
                          <Col md={7}>
                            <Form.Group className="mb-3" controlId="marks">
                              <Form.Control
                                type="text"
                                onChange={(e) => handleInputChange(i, e.target.value)}
                                placeholder="Enter option..."
                                size="sm"
                                className="option"
                                required
                                value={item.value}
                                autoComplete="off"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={5}>
                            {data?.options.length > 1 && (
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="delete_btn"
                                onClick={() => deleteOption(item.id)}
                              >
                                <BsTrash />
                              </Button>
                            )}
                          </Col>
                        </Row>

                      </>
                    ))
                  ) : (
                    <></>
                  )}
                  {single && data.options.length !== 4 ? <Row>
                    <Col>
                      {other ? (<></>) : (
                        <Button className="add_button" onClick={() => addOptions()}>
                          <BsPlus
                            title="Plus"

                          />Add Option
                        </Button>
                      )}
                    </Col>
                  </Row> : null}
                  {multi ? (
                    data?.options.map((item, i) => (
                      <Row>
                        <Col md={8}>
                          <Form.Group className="mb-3" controlId="marks">
                            <Form.Control
                              type="text"
                              onChange={(e) => handleInputChange(i, e.target.value)}
                              placeholder="Enter option..."
                              size="sm"
                              className="option"
                              required
                              value={item.value}
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Check onChange={() => handleTrigger(item.id)} />
                        </Col>
                        <Col md={2}>
                          {data?.options.length > 1 && (
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="delete_btn"
                              onClick={() => deleteOption(item.id)}
                            >
                              <BsTrash />
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}
                  {multi && data.options.length !== 4 ? <Row>
                    <Col>
                      {other ? (<></>) : (
                        <Button className="add_button" onClick={() => addOptions()}>
                          <BsPlus
                            title="Plus"

                          />Add Option
                        </Button>
                      )}
                    </Col>
                  </Row> : null}
                  {fill ? (
                    data?.options.map((item, i) => (
                      <Row>
                        <Col md={7}>
                          <Form.Group className="mb-3" controlId="marks">
                            <Form.Control
                              type="text"
                              onChange={(e) => handleInputChange(i, e.target.value)}
                              placeholder="Enter option..."
                              size="sm"
                              className="option"
                              required
                              value={item.value}
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={5}>
                          {data?.options.length > 1 && (
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="delete_btn"
                              onClick={() => deleteOption(item.id)}
                            >
                              Delete Option
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}
                  <Form.Group className="mb-3" controlId="answer">
                    {other ? (
                      <Row>
                        <Col md={12}>
                          <Form.Label>Answer</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Answer"
                            size="sm"
                            className="input"
                            required
                            value={data.answer}
                            onChange={(e) => handleotherAnswer(e)}
                            autoComplete="off"
                          />
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                    {single ? (
                      <Row>
                        <Col md={12}>
                          <Form.Select
                            aria-label="Default select example"
                            size="sm"
                            className="correct_answer"
                            required
                            onChange={(e) => handleAnswer(e)}
                          >
                            <option value="">Select Correct Answer</option>
                            {data?.options.map((o) => (
                              <option key={o.id} value={o.value}>
                                {o.value}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Button variant="outline-primary" className="button" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={handleSubmit} variant="outline-primary" className="button">
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

    </>
  );
};

export default BaseQuestion;
