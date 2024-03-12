import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button, Table } from "react-bootstrap";
import "./LessonPlan.css";
import SamplePdf from "../../../Images/MSAK.pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import AddLessonPlan from "./AddLessonPlan";
import LessonPlanDetails from "./LessonPlanDetails";
import { getLessonPlan } from "../../../ApiClient";
import TeacherSidebar from "../TeacherSidebar";

const TLessonPlan = () => {
  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  const [showAddLessonPlan, setShowAddLessonPlan] = useState(false);
  const [lessonPlanData, setLessonPlanData] = useState(false);

  useEffect(() => {
    lessonPlans();
  }, []);

  const lessonPlans = () => {
    const teacher_id = userDetails?.user_id;
    getLessonPlan(teacher_id)
      .then((res) => setLessonPlanData(res.data))
      .catch((err) => console.log(err));
  };

  const handleShowPlanModal = () => {
    setShowAddLessonPlan(true);
  };

  const closeAndLoad = () => {
    setShowAddLessonPlan(false);
    lessonPlans();
  };

  return (
    <>
      <div className="routinemain">
        <div className="masterRoutineheader">
          <Row>
            <Col md={9} style={{ textAlign: "left", paddingLeft: "50px" }}>
              <h3>Lesson Plan</h3>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleShowPlanModal}>
                + Add Lesson Plan
              </Button>{" "}
            </Col>
          </Row>
        </div>
        <div className="routineSection">
          <div className="lessonPlanDetails">
            <LessonPlanDetails lessonPlanData={lessonPlanData} />
          </div>
        </div>
      </div>
      {showAddLessonPlan && (
        <AddLessonPlan show={showAddLessonPlan} onHide={closeAndLoad} />
      )}
    </>
  );
};

export default TLessonPlan;
