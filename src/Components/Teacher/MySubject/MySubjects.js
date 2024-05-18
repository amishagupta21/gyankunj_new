import React from "react";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Dropdown,
  Table,
  ProgressBar,
  Card,
} from "react-bootstrap";
import { useState } from "react";
import "./MySubjects.css";
const MySubjects = () => {
  const Subjects = [
    { sub: "Hindi", color: "Primary" },
    { sub: "English", color: "Secondary" },
    { sub: "Maths", color: "Success" },
    { sub: "Geography", color: "Info" },
  ];

  return (
    <div className="reportSection">
      <Row
        style={{
          height: "74px",
          boxShadow: "0px 3px 6px #B4B3B329",
          position: "relative",
          left: "12px",
          width: "100%",
        }}
      >
        <Col md={10}>
          <h4>My Subjects</h4>
        </Col>
        {/* <Col md={2} className="teacherRoutingDD">
            <span>
                  <Dropdown>
                    <Dropdown.Toggle className="dropdownHead" id="dropdown-basic">
                    Select Date
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">2 </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">3 </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
            </Col> */}
      </Row>
      <Row style={{ marginTop: "50px" }}>
        {Subjects.map((subject, indx) => {
          return (
            <Col md={3}>
              <Card
                bg={subject.color}
                // key={variant}
                // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: "18rem", marginRight: "110px" }}
                className="mb-2"
              >
                <Card.Header>{`Subject - ${indx + 1}`}</Card.Header>

                <Card.Body>
                  <Card.Title> {subject.sub} </Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MySubjects;
