import React from "react";
import TeacherSidebar from "../TeacherSidebar";
import { Row, Col } from "react-bootstrap";

const ResourcesForTeacher = () => {
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
        <Col md={4}>
          <h4>Resources</h4>
        </Col>
      </Row>
    </div>
  );
};

export default ResourcesForTeacher;
