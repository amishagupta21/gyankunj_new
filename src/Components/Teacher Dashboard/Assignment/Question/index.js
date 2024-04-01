import React, { useState } from "react";
import { Row, Col, Button, Form, Badge } from "react-bootstrap";
import "./index.css";

const Question = ({ data, index, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const [validationError, setValidationError] = useState(null);

  const handleSaveEdit = () => {
    const isEmptyOption = editedData.all_options.some((option) => {
      return typeof option === "string" && !option.trim();
    });

    if (isEmptyOption) {
      setValidationError("All Options field cannot contain empty values");
      return;
    }

    if (
      editedData.type !== "subjective" &&
      (!editedData.correct_answer ||
        (Array.isArray(editedData.correct_answer) &&
          editedData.correct_answer.length === 0))
    ) {
      setValidationError("Answer cannot be empty");
      return;
    }

    setValidationError(null);
    handleEdit(index, editedData);
    setIsEditing(false);
  };

  const handleDeleteOption = (opIndex) => {
    const updatedOptions = [...editedData.all_options];
    updatedOptions.splice(opIndex, 1);

    const updatedAnswer = Array.isArray(editedData.correct_answer)
      ? editedData.correct_answer.filter(
          (option) => option !== editedData.all_options[opIndex]
        )
      : [];

    setEditedData({
      ...editedData,
      all_options: updatedOptions,
      correct_answer: updatedAnswer,
    });
  };

  const renderOptions = () => {
    return (
      <Row>
        <Col md={2}>
          <Form.Label className="questiondetail">All Options:</Form.Label>
        </Col>
        <Col md={8}>
          {editedData.all_options?.map((option, opIndex) => (
            <Row key={opIndex} className="mb-2 align-items-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...editedData.all_options];
                    updatedOptions[opIndex] = e.target.value;
                    setEditedData({
                      ...editedData,
                      all_options: updatedOptions,
                    });
                  }}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
                <Col md={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteOption(opIndex)}
                  >
                    Delete
                  </Button>
                </Col>
              </Col>
              <Col md={4}>
                {editedData.type === "multiple_choice(radio)" ? (
                  <Form.Check
                    type="radio"
                    label="Correct"
                    checked={editedData.correct_answer.includes(option)}
                    onChange={() => {
                      setEditedData({
                        ...editedData,
                        correct_answer: [option],
                      });
                    }}
                  />
                ) : (
                  <Form.Check
                    type="checkbox"
                    label="Correct"
                    checked={editedData.correct_answer.includes(option)}
                    onChange={() => {
                      const updatedAnswers = [...editedData.correct_answer];
                      const index = updatedAnswers.indexOf(option);

                      if (index !== -1) {
                        updatedAnswers.splice(index, 1);
                      } else {
                        updatedAnswers.push(option);
                      }

                      setEditedData({
                        ...editedData,
                        correct_answer: updatedAnswers,
                      });
                    }}
                  />
                )}
              </Col>
            </Row>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const updatedOptions = [...(editedData.all_options || []), ""];
              setEditedData({ ...editedData, all_options: updatedOptions });
            }}
          >
            Add Option
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div className="mb-5 border p-3 question-container">
      {isEditing ? (
        <div>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>
              Edit Question:
            </Form.Label>
            <Form.Control
              type="text"
              value={editedData.question}
              onChange={(e) =>
                setEditedData({ ...editedData, question: e.target.value })
              }
            />
          </Form.Group>
          {editedData.type !== "subjective" && <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>
              Check Answer:
            </Form.Label>
            <Form.Control
              type="text"
              value={
                Array.isArray(editedData.correct_answer)
                  ? editedData.correct_answer.join(", ")
                  : editedData.correct_answer
              }
              onChange={(e) =>
                setEditedData({ ...editedData, correct_answer: e.target.value })
              }
            />
          </Form.Group>}

          {editedData.type === "multiple_choice(radio)" && renderOptions()}
          {editedData.type === "multiple_choice(checkbox)" && renderOptions()}

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Edit Marks:</Form.Label>
            <Form.Control
              type="text"
              value={editedData.marks}
              onChange={(e) =>
                setEditedData({ ...editedData, marks: e.target.value })
              }
            />
          </Form.Group>

          {validationError && (
            <div className="text-danger mb-2">{validationError}</div>
          )}

          <Button variant="success" onClick={handleSaveEdit} className="me-2">
            Save
          </Button>

          <Button variant="danger" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Row className="mb-3">
            <Col md={2}>
              <span className="questiondetail" style={{ fontWeight: "bold" }}>
                Question:
              </span>
            </Col>
            <Col md={6}>
              <span className="questiondetail">{data.question}</span>
            </Col>
            <Col
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              {!isEditing && (
                <>
                  <span
                    className="questiondetail"
                    style={{ fontWeight: "bold" }}
                  >
                    Marks:
                  </span>
                  <span className="badge text-bg-success ms-2">
                    {data.marks}
                  </span>
                </>
              )}
            </Col>
            <Col
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              {!isEditing && (
                <Button
                  variant="outline-primary"
                  onClick={() => setIsEditing(true)}
                  className="me-3"
                  style={{ fontWeight: "bold" }}
                >
                  Edit
                </Button>
              )}
            </Col>
          </Row>
          {!["subjective"].includes(data.type) && (
            <Row className="mb-3">
              <Col md={2}>
                <span className="questiondetail" style={{ fontWeight: "bold" }}>
                  Answer:
                </span>
              </Col>
              <Col md={10}>
                {Array.isArray(data.correct_answer)
                  ? data.correct_answer.map((i) => (
                      <span key={i} className="me-2">
                        {i}.
                      </span>
                    ))
                  : data.correct_answer}
              </Col>
            </Row>
          )}
          {["multiple_choice(radio)", "multiple_choice(checkbox)"].includes(
            data.type
          ) && (
            <Row className="mb-3">
              <Col md={2}>
                <span className="questiondetail" style={{ fontWeight: "bold" }}>
                  All Options:
                </span>
              </Col>
              <Col md={10}>
                {console.log("data.all_options", data.all_options)}
                {data.all_options?.map((option, opIndex) => (
                  <Badge
                    key={opIndex}
                    pill
                    variant="primary"
                    className="custom-badge"
                  >
                    {option}
                  </Badge>
                ))}
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
