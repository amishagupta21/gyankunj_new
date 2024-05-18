import React from "react";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Dropdown,
  Table,
  ProgressBar,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import AddLogBook from "./AddLogbook";
import { viewLogBook, getGradeDetails } from "../../../ApiClient";
import Select from "react-select";
import { useEffect } from "react";

const LogBook = () => {
  const [showAddLogbook, setShowAddLogbook] = useState(false);
  const [section, setSection] = useState("");
  const [classData, setClassData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logBookDetails, setLogBookDetails] = useState([]);
  const [grade, setGrade] = useState("");
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    getAllGradeDetails();
  }, []);

  const handleShowLogBook = () => {
    setShowAddLogbook(true);
  };

  const classOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ];

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const handleSectionChange = (e) => {
    setSection(e.value);
  };

  const handleClassChange = (e) => {
    setClassData(e.target.value);
  };

  const showLogBookData = () => {
    const date = startDate;
    const grade_id = classData;
    const section_id = section;
    viewLogBook(startDate, classData, section)
      .then((res) => setLogBookDetails(res.data))
      .catch((err) => console.log(err));
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

  const closeAndLoad = () => {
    setShowAddLogbook(false);
    // showLogBookData();
  };

  return (
    <>
      <div className="reportSection">
        <Row
          style={{
            height: "74px",
            boxShadow: "0px 3px 6px #B4B3B329",
            position: "relative",
            left: "12px",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Col md={3}>
            <h4>Log Book</h4>
          </Col>
          <Col md={2} className="teacherRoutingDD">
            {/* <span>
            <Select placeholder="Select Section" isSearchable={false} options={sectionOptions} onChange={e => handleSectionChange(e)} />
                </span> */}
            <select
              className="principalGradeView"
              name="grade"
              id="grade"
              onChange={(e) => handleClassChange(e)}
            >
              <option value="">--Grade--</option>
              {gradeData?.grade_details?.grade_details?.map((grade) => {
                // console.log("grade - ", grade)
                return (
                  <option value={grade?.grade_id}>{grade?.grade_id}</option>
                );
              })}
            </select>
          </Col>
          <Col md={2} className="teacherRoutingDD">
            {/* <span>
            <Select placeholder="Select Class" isSearchable={false} options={classOptions} onChange={e => handleClassChange(e)} />
                </span> */}
            <select
              className="principalGradeView"
              name="section"
              id="section"
              onChange={(e) => handleSectionChange(e)}
            >
              <option value="">--Section--</option>
              {sectionOptions?.map((section, indx) => {
                return <option value={section?.value}>{section?.label}</option>;
              })}
            </select>
          </Col>
          <Col md={2} style={{ marginTop: "17px" }}>
            <Form.Control
              type="date"
              name="datepic"
              placeholder="DateRange"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col md={1} style={{ paddingTop: "17px" }}>
            <Button variant="outline-primary" onClick={showLogBookData}>
              Search
            </Button>
          </Col>
          <Col md={2} style={{ paddingTop: "17px" }}>
            <Button variant="outline-primary" onClick={handleShowLogBook}>
              + Add Logbook
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <span style={{ font: "normal normal bold 19px/34px Roboto" }}>
              Class Teacher's Name:
            </span>{" "}
            <span>{logBookDetails?.log_book_data?.class_teacher_name}</span>
          </Col>
          <Col md={1}></Col>
          <Col md={4}>
            <span style={{ font: "normal normal bold 19px/34px Roboto" }}>
              Day:
            </span>{" "}
            <span>{logBookDetails?.log_book_data?.day}</span>
          </Col>
          <Col md={1}></Col>
          <Col md={3}>
            <span style={{ font: "normal normal bold 19px/34px Roboto" }}>
              Date:
            </span>{" "}
            <span>{logBookDetails?.log_book_data?.date}</span>
          </Col>
        </Row>
        <div className="routineSection">
          <div></div>
          <Table striped hover>
            <thead>
              <tr
                style={{
                  background: "#7A9ABF 0% 0% no-repeat padding-box",
                  borderRadius: "4px 4px 0px 0px",
                  opacity: "1",
                }}
              >
                <th>Period</th>
                <th>Students Present</th>
                <th>Subject</th>
                <th>Content Taught</th>
                <th>Homework</th>
              </tr>
            </thead>
            {logBookDetails?.status == "failure" ? (
              <Row>
                <Col md={12}>
                  <h6
                    className="failureMessage"
                    style={{ position: "relative", left: "300px" }}
                  >
                    {logBookDetails?.message}
                  </h6>
                </Col>
              </Row>
            ) : (
              logBookDetails?.log_book_data?.log_record?.map(
                (logData, indx) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{logData?.period}</td>
                        <td>{logData?.students_present}</td>
                        <td>{logData?.subject_name}</td>
                        <td>{logData?.content_taught}</td>
                        <td>{logData?.home_work}</td>
                      </tr>
                    </tbody>
                  );
                }
              )
            )}
          </Table>
          <Row style={{ padding: "10px" }}>
            <Col md={3}>
              <h6 style={{ textAlign: "left" }}>Name of Absentees : </h6>
            </Col>
            <Col md={9} style={{ textAlign: "left" }}>
              {logBookDetails?.log_book_data?.name_of_absentees?.map(
                (absentees, indx) => {
                  return (
                    absentees?.student_name && `${absentees?.student_name}, `
                  );
                }
              )}
            </Col>
          </Row>
          <Row style={{ padding: "10px" }}>
            <Col md={3}>
              <h6 style={{ textAlign: "left" }}>
                Number of Dress Defaulters :{" "}
              </h6>
            </Col>
            <Col md={9} style={{ textAlign: "left" }}>
              {logBookDetails?.log_book_data?.name_of_dress_defaulters?.map(
                (dressDefaulter, indx) => {
                  return (
                    dressDefaulter?.student_name !== null &&
                    `${dressDefaulter?.student_name}, `
                  );
                }
              )}
            </Col>
          </Row>
        </div>
      </div>
      {showAddLogbook && (
        <AddLogBook
          show={showAddLogbook}
          onHide={() => setShowAddLogbook(false)}
          gradeData={gradeData}
          closeAndLoad={closeAndLoad}
        />
      )}
    </>
  );
};

export default LogBook;
