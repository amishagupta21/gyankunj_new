import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import StudentSidebar from "./StudentSidebar";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Dropdown,
  Card,
  Form,
  Table,
} from "react-bootstrap";
import { studentAssignmentList, studentRoutine } from "../../ApiClient";
import Select from "react-select";
// import PrincipalLogBook from "./PrincipalLogbook";

const StudentDashboard = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [tableData, setTableData] = useState([]);
  const [overallAttendance, setOverallAttendance] = useState({});
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("1");
  const [gradeData, setGradeData] = useState([]);
  const [weekDayToFetch, setWeekDayToFetch] = useState("");
  const [assignmentData, setAssignmentData] = useState({});
  const [studentRoutineData, setStudentRoutineData] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  useEffect(() => {
    getStudentAssignmentList();
    getStudentRoutine();
  }, []);

  const getStudentAssignmentList = () => {
    const student_id = userDetails.user_id;
    studentAssignmentList(student_id)
      .then((res) => setAssignmentData(res.data))
      .catch((err) => console.log("Assignments err - ", err));
  };

  const getStudentRoutine = () => {
    const grade = userDetails?.grade;
    const year = "2022";
    studentRoutine(grade, year)
      .then((res) => setStudentRoutineData(res.data))
      .catch((err) => console.log("Routine err - ", err));
  };

  const weekDayOption = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];

  //   const handlesectionToFetchLog = (e) => {
  //     setSectionToFetchLog(e.value)
  //   }

  //   const handlegradeToFetchLog = (e) => {
  //     setGradeToFetchLog(e.value)
  //   }

  const handleWeekDayChange = (e) => {
    setWeekDayToFetch(e.value);
    // fetchTeacherRoutine()
  };

  console.log("weekDayToFetch - ", weekDayToFetch);
  return (
    <>
      <Row>
        <Col md={9} style={{ marginTop: "91px", width: "75%" }}>
          <Row>
            <Col md={3}>
              <div className="subjectsInDashboard">
                <Row
                  style={{
                    height: "68px",
                    boxShadow: "0px 3px 6px #B4B3B329",
                    position: "relative",
                    left: "12px",
                    width: "100%",
                  }}
                >
                  <Col md={4}>
                    <h4>Subjects</h4>
                  </Col>
                  {/* <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Section"
                      isSearchable={false}
                      options={sectionOptions}
                      onChange={(e) => handlesectionToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Class"
                      isSearchable={false}
                      options={classOptions}
                      onChange={(e) => handlegradeToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} style={{ marginTop: "17px" }}>
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={dateToFetchLog}
                    onChange={(e) => setDateToFetchLog(e.target.value)}
                  />
                </Col>
                <Col md={1} style={{ paddingTop: "17px" }}>
                  <Button variant="outline-primary" onClick={getLogBook}>
                    Search
                  </Button>
                </Col> */}
                </Row>
                <Row
                  md={12}
                  style={{ justifyContent: "space-evenly", paddingTop: "20px" }}
                >
                  <Col md={3} className="subjectsDetails">
                    <h6>English</h6>
                  </Col>
                  <Col md={3} className="subjectsDetails">
                    <h6>Hindi</h6>
                  </Col>
                  <Col md={3} className="subjectsDetails">
                    <h6>Maths</h6>
                  </Col>
                  <Col md={3} className="subjectsDetails">
                    <h6>History</h6>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <div className="assignmentInDashboard">
                <Row
                  style={{
                    height: "68px",
                    boxShadow: "0px 3px 6px #B4B3B329",
                    position: "relative",
                    left: "12px",
                    width: "100%",
                  }}
                >
                  <Col md={4}>
                    <h4>Assignments</h4>
                  </Col>
                  {/* <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Section"
                      isSearchable={false}
                      options={sectionOptions}
                      onChange={(e) => handlesectionToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Class"
                      isSearchable={false}
                      options={classOptions}
                      onChange={(e) => handlegradeToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} style={{ marginTop: "17px" }}>
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={dateToFetchLog}
                    onChange={(e) => setDateToFetchLog(e.target.value)}
                  />
                </Col>
                <Col md={1} style={{ paddingTop: "17px" }}>
                  <Button variant="outline-primary" onClick={getLogBook}>
                    Search
                  </Button>
                </Col> */}
                </Row>
                <Row
                  md={12}
                  style={{ justifyContent: "space-evenly", paddingTop: "20px" }}
                >
                  <Col md={12} className="AssignmentDetails">
                    <Table striped hover>
                      <thead>
                        <tr
                          style={{
                            background: "#7A9ABF 0% 0% no-repeat padding-box",
                            borderRadius: "4px 4px 0px 0px",
                            opacity: "1",
                          }}
                        >
                          <th>Sl. No.</th>
                          <th>Subject</th>
                          <th>Assignment Name</th>
                          <th>Assignment Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {assignmentData?.student_assignments ? (
                        assignmentData?.student_assignments?.map(
                          (assignment, indx) => {
                            return (
                              <tbody>
                                <tr>
                                  <td>{indx + 1}</td>
                                  <td>Maths</td>
                                  <td>{assignment?.assignment_name}</td>
                                  <td>{assignment?.assignment_type_name}</td>
                                  <td>{assignment?.assignment_status}</td>
                                </tr>
                              </tbody>
                            );
                          }
                        )
                      ) : (
                        <p
                          style={{
                            top: "43%",
                            left: "42%",
                            position: "absolute",
                            font: "normal normal bold 20px/34px Roboto",
                          }}
                        >
                          No Assignments Available!!
                        </p>
                      )}
                    </Table>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={3} style={{ marginTop: "91px", width: "25%" }}>
          <Row>
            <Col md={5} className="teacherRightPanel">
              <Row className="teacherRightPanel-header">
                <Col md={5}>
                  <h4>My Schedule</h4>
                </Col>
                <Col md={6}>
                  <Select
                    placeholder="Day"
                    isSearchable={false}
                    options={weekDayOption}
                    onChange={(e) => handleWeekDayChange(e)}
                    // onClick={fetchTeacherRoutine}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {studentRoutineData?.time_table ? (
                    studentRoutineData?.time_table?.map((routine, indx) => {
                      return (
                        <Card
                          style={{
                            height: "81px",
                            marginBottom: "5px",
                            backgroundColor: "#0DCAF0",
                          }}
                        >
                          <Card.Body>
                            <span
                              style={{
                                font: "normal normal normal 14px/21px Roboto",
                                letterSpacing: " 0px",
                                color: "white",
                              }}
                            >{`${routine.time_range} --- ${routine.subject_name}--${routine.teacher}`}</span>
                          </Card.Body>
                        </Card>
                      );
                    })
                  ) : (
                    <p>{studentRoutineData?.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default StudentDashboard;
