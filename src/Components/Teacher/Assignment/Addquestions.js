import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import {
  getQuestions,
  SaveAssignmentData,
  publishAssignmentData,
} from "../../../ApiClient";
import BaseQuestion from "./QuestionForm/base";
import Question from "./Question";
import "./addQuestion.css";

const AddQuestions = () => {
  const navigate = useNavigate();
  const { state: id } = useLocation();
  const userDetails = JSON.parse(localStorage.getItem("UserData"));
  const [questionList, setQuestionList] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQueries(id);
  }, []);

  const getQueries = async (id) => {
    const res = await getQuestions(id);
    if(res?.data?.assignment_details && res?.data?.assignment_details.length > 0){
      setQuestionList(res?.data?.assignment_details[0]?.assignment_data); 
    }
  };

  useEffect(() => {
    setQuestions(Object.values(questionList));
  }, [questionList]);

  const handle = (data) => {
    setQuestions((old) => [...old, data]);
  };

  const handleBack = () => navigate("/teacherDashboard/assignments");

  const handlePublish = async (isPublish) => {
    let requestPayload = {};
    const tempQues = [...questions];
    if (tempQues && tempQues.length > 0) {
      tempQues.map((item, index) => {
        if(item.type === 'fill_in_the_blanks' && typeof item.correct_answer !== 'string'){
          item.correct_answer = item.correct_answer.join();
        }
        requestPayload[`question_number_${index + 1}`] = item;
      });
    }
    const result = {
      assignment_id: id,
      assignment_data: requestPayload,
    };

    try {
      const saveRes = await SaveAssignmentData(result);

      if (saveRes.data.status === "success") {
        if(isPublish){
          const publishRes = await publishAssignmentData(id);
          if (publishRes.data.status === "success") {
            navigate("/teacherDashboard/assignments");
          } else {
            console.log("ERR", publishRes.data.status);
            navigate("/teacherDashboard/assignments");
          } 
        }
        else{
          navigate("/teacherDashboard/assignments");
        }
      } else {
        console.log("ERR", saveRes.data.status);
        navigate("/teacherDashboard/assignments");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (index, updatedData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedData;
    setQuestions(updatedQuestions);
  };
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
        <Col md={9}>
          <div className="d-flex flex-row align-items-center">
            <h4>Add Questions</h4>
            <BaseQuestion id={id} handle={handle} />
          </div>
        </Col>
        <Col md={3} style={{ paddingTop: "17px" }} onClick={handleBack}>
          <Button variant="outline-primary">Go to Assignments</Button>
        </Col>
      </Row>
      {questions.length > 0 && (
        <div className="d-flex justify-content-end mt-4 mx-5">
          <Button variant="outline-primary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="outline-primary mx-3" onClick={() => handlePublish(false)}>
            Save
          </Button>
          <Button variant="outline-primary" onClick={() => handlePublish(true)}>
            Publish
          </Button>
        </div>
      )}
      <Row>
        <Col style={{ marginTop: "45px" }}>
          {questions.map((data, index) => (
            <Question
              key={index}
              data={data}
              index={index}
              handleEdit={handleEdit}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AddQuestions;
