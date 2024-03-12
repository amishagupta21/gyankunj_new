import React, { useEffect, useState } from "react";
// import './PrincipalDashboard.css'
import {
  Row,
  Col,
  Modal,
  Dropdown,
  Table,
  Form,
  Button,
  Card,
} from "react-bootstrap";
// import DashboardContent from './DashboardContent'
// import DashboardRightPanel from './DashboardRightPanel'
import {
  viewLogBook,
  getTeacherRoutine,
  getAllStudentsData,
  saveAttendance,
  getGradeDetails,
} from "../../../ApiClient";
import "../TeacherDashboard.css";
import TeacherSidebar from "../TeacherSidebar";
import Select from "react-select";
import CheckAttendance from "./AttendanceCheckModal";
import { FaCheckSquare } from "react-icons/fa";

const TDashboard = () => {
  const [dateToFetchLog, setDateToFetchLog] = useState("");
  const [gradeToFetchLog, setGradeToFetchLog] = useState("");
  const [sectionToFetchLog, setSectionToFetchLog] = useState("");
  const [startDate, setStartDate] = useState("");
  const [logBookDetails, setLogBookDetails] = useState("");
  const [weekDayToFetch, setWeekDayToFetch] = useState("");
  const [teacherRoutineData, setTeacherRoutineData] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const [absentCheckedValue, SetAbsentCheckedValue] = useState("");
  const [dressCheckedValue, SetDressCheckedValue] = useState("");
  const [absenteesList, setAbsenteesList] = useState([]);
  const [dressDList, setDressDList] = useState([]);
  const [showCheckAttendanceModal, setShowCheckAttendanceModal] =
    useState(false);
  const [absenteesValue, setAbsenteesValue] = useState([]);
  const [dressDValue, setDressDValue] = useState([]);
  const [sectionToFetchAtt, setSectionToFetchAtt] = useState("");
  const [gradeToFetchAtt, setGradeToFetchAtt] = useState("");
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    functn();
    fetchTeacherRoutine();
    getAllGradeDetails();
    // getAllStudents()
  }, []);

  const functn = () => {
    const today = new Date();
    const day = today.getDay();
    const dayList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const presentDay = dayList[day];

    setWeekDayToFetch(presentDay);
  };

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const userDetails = JSON.parse(window.localStorage.getItem("UserData"));

  const getLogBook = () => {
    const date = dateToFetchLog;
    const grade = gradeToFetchLog;
    const section = sectionToFetchLog;
    viewLogBook(date, grade, section)
      .then((res) => setLogBookDetails(res.data))
      .catch((err) => console.log(err));
  };

  const fetchTeacherRoutine = () => {
    const userId = userDetails.user_id;
    const day = weekDayToFetch;
    getTeacherRoutine(userId, day)
      .then((res) => setTeacherRoutineData(res.data))
      .catch((err) => console.log(err, "errorTeacher"));
  };

  const getAllStudents = () => {
    const grade = gradeToFetchAtt;
    const section = sectionToFetchAtt;
    getAllStudentsData(grade, section)
      .then((res) => setStudentDetails(res.data))
      .catch((err) => console.log(err));
  };

  const addAbsentees = (e) => {
    let newAbsenteesList = [...absenteesList, e.target.id];
    let newAbsenteesValue = [...absenteesValue, e.target.value];
    if (absenteesList.includes(e.target.id)) {
      newAbsenteesList = newAbsenteesList.filter(
        (absentees) => absentees !== e.target.id
      );
    }
    setAbsenteesList(newAbsenteesList);

    if (absenteesValue.includes(e.target.value)) {
      newAbsenteesValue = newAbsenteesValue.filter(
        (absentees) => absentees !== e.target.value
      );
    }
    setAbsenteesValue(newAbsenteesValue);
  };

  console.log("absenteesValue - ", absenteesValue);

  const addDressDefaulterList = (e) => {
    let newDressList = [...dressDList, e.target.id];
    let newDressDValue = [...dressDValue, e.target.value];
    if (dressDList.includes(e.target.id)) {
      newDressList = newDressList.filter((dressD) => dressD !== e.target.id);
    }
    setDressDList(newDressList);

    if (dressDValue.includes(e.target.value)) {
      newDressDValue = newDressDValue.filter(
        (dressD) => dressD !== e.target.value
      );
    }
    setDressDValue(newDressDValue);
  };

  console.log("dressDValue - ", dressDValue);

  const weekDayOption = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];

  const handlesectionToFetchLog = (e) => {
    setSectionToFetchLog(e.target.value);
  };

  const handlegradeToFetchLog = (e) => {
    setGradeToFetchLog(e.target.value);
  };

  const handlesectionToFetchAtt = (e) => {
    setSectionToFetchAtt(e.target.value);
  };

  const handlegradeToFetchAtt = (e) => {
    setGradeToFetchAtt(e.target.value);
  };

  const handleWeekDayChange = (e) => {
    setWeekDayToFetch(e.value);
  };

  const closeAndLoad = () => {
    setShowCheckAttendanceModal(false);
    getAllStudents();
    unCheckRadio();
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

  const unCheckRadio = () => {
    let allRadioBtn = document.querySelectorAll(".radioBtn");

    allRadioBtn.forEach((value) => (value.checked = false));
  };

  return (
    <>
      <Row>
        <Col md={9} style={{ marginTop: "91px", width: "75%" }}>
          <div className="teacherRoutine" style={{ height: "300px" }}>
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
                <h4>LogBook</h4>
              </Col>
              <Col md={2} className="teacherRoutingDD">
                <select
                  className="principalGradeView"
                  name="grade"
                  id="grade"
                  onChange={(e) => handlegradeToFetchLog(e)}
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
                <select
                  className="principalGradeView"
                  name="section"
                  id="section"
                  onChange={(e) => handlesectionToFetchLog(e)}
                >
                  <option value="">--Section--</option>
                  {sectionOptions?.map((section) => {
                    return (
                      <option value={section.value}>{section.label}</option>
                    );
                  })}
                </select>
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
                <Button
                  disabled={
                    !(gradeToFetchLog && sectionToFetchLog, dateToFetchLog)
                  }
                  variant="primary"
                  onClick={getLogBook}
                >
                  Search
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <span style={{ font: "normal normal bold 13px/34px Roboto" }}>
                  Class Teacher's Name:
                </span>{" "}
                <span style={{ font: "normal normal normal 13px/34px Roboto" }}>
                  {logBookDetails?.log_book_data?.class_teacher_name}
                </span>
              </Col>
              <Col md={1}></Col>
              <Col md={4}>
                <span style={{ font: "normal normal bold 13px/34px Roboto" }}>
                  Day:
                </span>{" "}
                <span style={{ font: "normal normal normal 13px/34px Roboto" }}>
                  {logBookDetails?.log_book_data?.day}
                </span>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <span style={{ font: "normal normal bold 13px/34px Roboto" }}>
                  Date:
                </span>{" "}
                <span style={{ font: "normal normal normal 13px/34px Roboto" }}>
                  {logBookDetails?.log_book_data?.date}
                </span>
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
                {logBookDetails?.log_book_data?.log_record?.length > 0 ? (
                  logBookDetails?.log_book_data?.log_record?.map(
                    (logData, indx) => {
                      return (
                        <tbody>
                          <tr>
                            <td>{logData?.period}</td>
                            <td>{logData?.students_present}</td>
                            <td>{logData?.subject}</td>
                            <td>{logData?.content_taught}</td>
                            <td>{logData?.home_work}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  )
                ) : logBookDetails?.status == "failure" ? (
                  <td
                    colSpan={5}
                    style={{
                      height: "100px",
                      paddingTop: "50px",
                      font: "normal normal normal 21px/21px Roboto",
                    }}
                  >
                    {logBookDetails?.message}
                  </td>
                ) : (
                  <td
                    colSpan={5}
                    style={{
                      height: "100px",
                      paddingTop: "50px",
                      font: "normal normal normal 21px/21px Roboto",
                    }}
                  >
                    Select Grade, Section and Date to view Logbook
                  </td>
                )}
              </Table>
              <Row style={{ padding: "10px" }}>
                <Col md={3}>
                  <h6 style={{ textAlign: "left" }}>Name of Absentees : </h6>
                </Col>
                {
                  <Col md={9} style={{ textAlign: "left" }}>
                    {logBookDetails?.log_book_data?.name_of_absentees?.map(
                      (absentees, indx) => {
                        console.log("Absentees - ", absentees);
                        return (
                          absentees?.student_name !== null && (
                            <span>{`${absentees?.student_name}, `}</span>
                          )
                        );
                      }
                    )}
                  </Col>
                }
              </Row>
              <Row style={{ padding: "10px" }}>
                <Col md={3}>
                  <h6 style={{ textAlign: "left" }}>Dress Defaulters : </h6>
                </Col>
                <Col md={9} style={{ textAlign: "left" }}>
                  {logBookDetails?.log_book_data?.name_of_dress_defaulters?.map(
                    (dressDefaulter, indx) => {
                      console.log("dressDefaulter - ", dressDefaulter);
                      return (
                        dressDefaulter?.student_name !== null && (
                          <span>{`${dressDefaulter?.student_name}, `}</span>
                        )
                      );
                    }
                  )}
                </Col>
              </Row>
            </div>
          </div>

          <div className="teacherDashboardAttendance">
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
                <h4>Student's Attendance</h4>
              </Col>

              <Col md={2} className="teacherRoutingDD">
                <select
                  className="principalGradeView"
                  name="grade"
                  id="grade"
                  onChange={(e) => handlegradeToFetchAtt(e)}
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
                <select
                  className="principalGradeView"
                  name="section"
                  id="section"
                  onChange={(e) => handlesectionToFetchAtt(e)}
                >
                  <option value="">--Section--</option>
                  {sectionOptions?.map((section) => {
                    return (
                      <option value={section.value}>{section.label}</option>
                    );
                  })}
                </select>
              </Col>
              <Col md={2} style={{ paddingTop: "16px", paddingRight: "100px" }}>
                {gradeToFetchAtt && sectionToFetchAtt && (
                  <FaCheckSquare
                    onClick={getAllStudents}
                    style={{
                      height: "40px",
                      width: "40px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Col>
              <Col md={2} style={{ paddingTop: "17px" }}>
                <Button
                  variant="primary"
                  onClick={() => setShowCheckAttendanceModal(true)}
                  disabled={!(absenteesList?.length || dressDList?.length)}
                >
                  Submit
                </Button>
              </Col>
            </Row>

            {/* ATTENDANCE BLOCK */}

            <div className="studentAttendance">
              <Row
                style={{
                  boxShadow: "rgba(180, 179, 179, 0.16) 0px 3px 6px",
                  height: "54px",
                }}
              >
                <Col className="studentAttendanceHeader" md={2}>
                  Roll Number
                </Col>
                <Col className="studentAttendanceHeader" md={6}>
                  Name
                </Col>
                <Col className="studentAttendanceHeader" md={2}>
                  Absent
                </Col>
                <Col className="studentAttendanceHeader" md={2}>
                  Dress Defaulter
                </Col>
              </Row>
              <div className="studentAttendanceInner">
                {studentDetails?.student_details?.length > 0 ? (
                  studentDetails?.student_details?.map((student, indx) => {
                    return (
                      <Row style={{ marginTop: "20px" }}>
                        <Col className="studentAttendanceDetails" md={2}>
                          {student?.roll_no}
                        </Col>
                        <Col className="studentAttendanceDetails" md={6}>
                          {student?.student_name}
                        </Col>

                        {/* <Col className="studentAttendanceDetails" md={2}>
                          <Form.Check
                            value={student?.student_name}
                            name="group1"
                            type="radio"
                            id={student?.student_id}
                            onChange={(e) => addAbsentees(e)}
                          />
                        </Col>
                        <Col className="studentAttendanceDetails" md={2}>
                            <Form.Check
                            value={student?.student_name}
                            name="group1"
                            type="radio"
                            id={student?.student_id}
                            onChange={(e) => addDressDefaulterList(e)}
                          />
                         
                        </Col> */}
                        <Col md={4}>
                          {/* <Form>
                              <div key="inline-radio" className="mb-3">
                                <Form.Check
                                className='radioBtn'
                                  inline
                                  value={student?.student_name}
                                  name="group1"
                                  type="radio"
                                  id={student?.student_id}
                                  onChange={(e) => addAbsentees(e)}
                                  style={{
                                    position: "relative",
                                    right: "27px",
                                  }}
                                />
                                <Form.Check
                                  inline
                                  value={student?.student_name}
                                  name="group1"
                                  type="radio"
                                  id={student?.student_id}
                                  onChange={(e) => addDressDefaulterList(e)}
                                  style={{ position: "relative", left: "82px" }}
                                />
                              </div>
                            </Form> */}
                          <input
                            type="radio"
                            name="fav_language"
                            value={student?.student_name}
                            id={student?.student_id}
                            className="radioBtn"
                            onChange={(e) => addAbsentees(e)}
                            style={{
                              position: "relative",
                              right: "46px",
                            }}
                          ></input>
                          <input
                            type="radio"
                            name="fav_language"
                            value={student?.student_name}
                            id={student?.student_id}
                            className="radioBtn"
                            onChange={(e) => addDressDefaulterList(e)}
                            style={{
                              position: "relative",
                              left: "80px",
                            }}
                          ></input>
                        </Col>
                      </Row>
                    );
                  })
                ) : studentDetails?.status == "failure" ? (
                  <Col
                    md={12}
                    style={{
                      height: "134px",
                      paddingTop: "62px",
                      font: "normal normal normal 21px/21px Roboto",
                    }}
                  >
                    No Data Available!!
                  </Col>
                ) : (
                  <Col
                    md={12}
                    style={{
                      height: "134px",
                      paddingTop: "62px",
                      font: "normal normal normal 21px/21px Roboto",
                    }}
                  >
                    Select Grade and Section to view Attendance Register
                  </Col>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col md={3} style={{ marginTop: "91px", width: "25%" }}>
          <Row>
            <Col md={6} className="teacherRightPanel">
              <Row className="teacherRightPanel-header">
                <Col md={12}>
                  <h4>My Schedule</h4>
                </Col>
              </Row>
              <Row style={{ marginTop: "14px" }}>
                <Col md={10}>
                  <Select
                    placeholder="Day"
                    isSearchable={false}
                    options={weekDayOption}
                    onChange={(e) => handleWeekDayChange(e)}
                  />
                </Col>

                <Col md={2}>
                  {weekDayToFetch !== "" && (
                    <FaCheckSquare
                      onClick={fetchTeacherRoutine}
                      style={{
                        height: "40px",
                        width: "40px",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col md={12}>
                  {teacherRoutineData ? (
                    teacherRoutineData?.time_table?.map((routine, indx) => {
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
                            >{`${routine.grade} ${routine.section_name} --- ${routine.time_range} --- ${routine.subject_name}`}</span>
                          </Card.Body>
                        </Card>
                      );
                    })
                  ) : (
                    <p>No Schedule Available</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {showCheckAttendanceModal && (
        <CheckAttendance
          show={showCheckAttendanceModal}
          onHide={() => setShowCheckAttendanceModal(false)}
          absenteesValue={absenteesValue}
          dressDValue={dressDValue}
          absenteesList={absenteesList}
          dressDList={dressDList}
          closeAndLoad={closeAndLoad}
        />
      )}
    </>
  );
};

export default TDashboard;
