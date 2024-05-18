import React from "react";
import { Row, Col, Card } from "react-bootstrap";
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
      </Row>
      <Row style={{ marginTop: "50px" }}>
        {Subjects.map((subject, indx) => {
          return (
            <Col md={3}>
              <Card
                bg={subject.color}
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
