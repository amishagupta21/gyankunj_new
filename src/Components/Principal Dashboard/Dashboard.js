import React, { useEffect, useState } from "react";
import "./PrincipalDashboard.css";
import PrincipalSidebar from "./PrincipalSidebar";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Button,
  Table,
  Form,
  Card,
} from "react-bootstrap";
// import DashboardContent from './DashboardContent'
// import DashboardRightPanel from './DashboardRightPanel'
import {
  attendanceOverview,
  getGradeDetails,
  getTeachersData,
  getTeacherRoutine,
  viewLogBook,
} from "../../ApiClient";
import Select from "react-select";
// import mockData from '../../Mock Data/mockdata.json'
import PrincipalLogBook from "./PrincipalLogbook";
import { FaCheckSquare } from "react-icons/fa";

const PDashboard = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [overallAttendance, setOverallAttendance] = useState({});
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [dayData, setDayData] = useState("");
  const [gradeData, setGradeData] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [teacherRoutineData, setTeacherRoutineData] = useState({});
  const [dateToFetchLog, setDateToFetchLog] = useState("");
  const [gradeToFetchLog, setGradeToFetchLog] = useState("");
  const [sectionToFetchLog, setSectionToFetchLog] = useState("");
  const [princiViewLogBook, setPrinciViewLogBook] = useState([]);
  const [weekDayToFetch, setWeekDayToFetch] = useState("");

  useEffect(() => {
    getAllTeachersData();
    fetchTeacherRoutine();
  }, [teacherName && weekDayToFetch]);

  useEffect(() => {
    getAttendanceOverview();
    getAllGradeDetails();
  }, [grade && section]);

  const gradeOptions = [
    { value: "1", label: 1 },
    { value: "2", label: 2 },
    { value: "3", label: 3 },
    { value: "4", label: 4 },
    { value: "5", label: 5 },
    { value: "6", label: 6 },
    { value: "7", label: 7 },
    { value: "8", label: 8 },
    { value: "9", label: 9 },
    { value: "10", label: 10 },
  ];

  const radios = [
    { name: "A", value: "1" },
    { name: "B", value: "2" },
    { name: "C", value: "3" },
    { name: "D", value: "4" },
  ];

  const sectionOptions = [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
    { label: "D", value: "4" },
  ];

  const column = [
    { field: "Period", value: "Period" },
    { field: "Students present", value: "Student Present" },
    { field: "Subject", value: "Subject" },
    { field: "Content taught", value: "Content Taught" },
    { field: "Homework", value: "Homework" },
    { field: "Absentees", value: "Absent" },
  ];

  const routineColumn = [
    { field: "1st", value: "Subject" },
    { field: "2nd", value: "Subject" },
    { field: "3rd", value: "Subject" },
    { field: "4th", value: "Subject" },
    { field: "Break", value: "Subject" },
    { field: "5th", value: "Subject" },
    { field: "6th", value: "Subject" },
    { field: "7th", value: "Subject" },
    { field: "8th", value: "Subject" },
  ];

  const routineRow = [
    { field: "Hindi", value: "Hindi" },
    { field: "Time", value: "Time" },
    { field: "Teacher", value: "Teacher" },
  ];

  const dayOption = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];

  const weekDayOption = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    // setRadioValue(e.currentTarget.value)
  };

  const handleSectionChangeToFetchLog = (e) => {
    setSectionToFetchLog(e.target.value);
  };

  const handleGradeChangeToFetchLog = (e) => {
    setGradeToFetchLog(e.target.value);
  };

  const handleDayChange = (e) => {
    setDayData(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setTeacherName(e.target.value);
  };

  const handleWeekDayChange = (e) => {
    setWeekDayToFetch(e.target.value);
    // fetchTeacherRoutine(weekDayToFetch)
  };

  const getAttendanceOverview = () => {
    const grade_id = grade;
    const section_id = section;
    attendanceOverview(grade_id, section_id)
      .then((res) => setOverallAttendance(res.data))
      .then((err) => console.log(err));
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

  const getAllTeachersData = () => {
    getTeachersData().then((res) => {
      setTeacherData(res.data);
      // const teacherData = res.data
      // return teacherData;
    });
    // .catch((err) => console.log("Teachers err - ",  err))
  };

  const fetchTeachersLogBook = () => {
    const date = dateToFetchLog;
    const grade = gradeToFetchLog;
    const section = sectionToFetchLog;
    viewLogBook(date, grade, section)
      .then((res) => setPrinciViewLogBook(res.data))
      .catch((err) => console.log(err));
  };

  const fetchTeacherRoutine = () => {
    const userId = teacherName;
    const day = weekDayToFetch;
    getTeacherRoutine(userId, day)
      .then((res) => setTeacherRoutineData(res.data))
      .catch((err) => console.log(err, "errorTeacher"));
  };

  return (
    <>
      <Row>
        <Col md={9} style={{ width: "75%" }}>
          <div className="dashboardMain">
            <div>
              <div className="PrinciAttendanceOverview">
                <Row
                  style={{
                    height: "74px",
                    boxShadow: "0px 3px 6px #B4B3B329",
                    position: "relative",
                    left: "12px",
                    width: "97%",
                  }}
                >
                  <Col md={6}>
                    <h4>Attendance Overview</h4>
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={3}
                    className="attendanceOverviewInner"
                    style={{
                      borderRight: "1px solid #EFF1F4",
                      height: "175px",
                      paddingTop: "20px",
                    }}
                  >
                    <h6
                      style={{
                        marginLeft: "12px",
                        paddingTop: "5px",
                        textAlign: "center",
                        font: "normal normal medium 14px/15px Roboto",
                        letterSpacing: "0px",
                        color: "#821CE8",
                        opacity: "1",
                      }}
                    >
                      Teacher
                    </h6>
                    <Row style={{ margin: "10px 0px" }}>
                      <Col md={6}>
                        <span>Present</span>
                      </Col>
                      <Col md={6}>
                        <p>
                          {
                            overallAttendance?.attendance_overview?.teacher
                              ?.present
                          }
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <span>Absent</span>
                      </Col>
                      <Col md={6}>
                        <p>
                          {
                            overallAttendance?.attendance_overview?.teacher
                              ?.absent
                          }
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={9} className="attendanceOverviewInner">
                    <Row>
                      <Col md={6}>
                        <h6
                          style={{
                            background: "#DEFABD 0% 0% no-repeat padding-box",
                            marginLeft: "12px",
                            paddingTop: "5px",
                            textAlign: "center",
                            font: "normal normal medium 14px/15px Roboto",
                            letterSpacing: "0px",
                            color: "#608E29",
                            opacity: "1",
                          }}
                        >
                          Student
                        </h6>
                      </Col>
                      <Col md={3} className="dflex">
                        <select
                          className="principalGradeView"
                          name="teacher"
                          id="teacher"
                          onChange={(e) => handleGradeChange(e)}
                        >
                          <option value="">--Grade--</option>
                          {gradeData?.grade_details?.grade_details?.map(
                            (grade) => {
                              // console.log("grade - ", grade)
                              return (
                                <option value={grade?.grade_id}>
                                  {grade?.grade_id}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </Col>
                      <Col md={3} className="dflex">
                        <select
                          className="principalGradeView"
                          name="teacher"
                          id="teacher"
                          onChange={(e) => handleSectionChange(e)}
                        >
                          <option value="">--Section--</option>
                          {sectionOptions?.map((section) => {
                            return (
                              <option value={section?.value}>
                                {section?.label}
                              </option>
                            );
                          })}
                        </select>
                      </Col>
                    </Row>

                    <Row style={{ width: "70%" }}>
                      <Col md={4}>
                        <span style={{ marginRight: "20px" }}>Overview</span>
                        <span
                          style={{
                            textAlign: "center",
                            font: "normal normal bold 27px/35px Roboto",
                            letterSpacing: "0px",
                            color: "#608E29",
                            opacity: "1",
                          }}
                        >
                          {
                            overallAttendance?.attendance_overview?.student
                              ?.total
                          }
                        </span>
                      </Col>
                      <Col>
                        <span style={{ marginRight: "20px" }}>Present</span>
                        <span
                          style={{
                            textAlign: "center",
                            font: "normal normal bold 27px/35px Roboto",
                            letterSpacing: "0px",
                            color: "#608E29",
                            opacity: "1",
                          }}
                        >
                          {
                            overallAttendance?.attendance_overview?.student
                              ?.present
                          }
                        </span>
                      </Col>
                      <Col>
                        <span style={{ marginRight: "20px" }}>Absent</span>
                        <span
                          style={{
                            textAlign: "center",
                            font: "normal normal bold 27px/35px Roboto",
                            letterSpacing: "0px",
                            color: "#608E29",
                            opacity: "1",
                          }}
                        >
                          {
                            overallAttendance?.attendance_overview?.student
                              ?.absent
                          }
                        </span>
                      </Col>
                    </Row>
                    {/* <Row
                        style={{
                          width: "70%",
                          marginTop: "12px",
                          border: "1px solid #EFF1F4",
                          borderRadius: "8px",
                          backgroundColor: "#E1E9F3",
                          height: "53px",
                          paddingTop: "7px",
                          marginLeft: "5px",
                        }}
                      >
                        <Col>
                          <h5>Section</h5>
                        </Col>
                        <Col>
                          <ButtonGroup>
                            {radios.map((radio, idx) => (
                              <ToggleButton
                                className="toggleBtn"
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={
                                  idx % 1
                                    ? "outline-success"
                                    : "outline-primary"
                                }
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => handleSectionChange(e)}
                                disabled={!grade}
                              >
                                {radio.name}
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </Col>
                      </Row> */}
                  </Col>
                </Row>
              </div>

              <div className="princiDashboardLogbook">
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
                    <h4>Log Book</h4>
                  </Col>
                  <Col md={2} className="teacherRoutingDD">
                    <select
                      className="principalGradeView"
                      name="grade"
                      id="grade"
                      onChange={(e) => handleGradeChangeToFetchLog(e)}
                    >
                      <option value="">--Grade--</option>
                      {gradeData?.grade_details?.grade_details?.map((grade) => {
                        // console.log("grade - ", grade)
                        return (
                          <option value={grade?.grade_id}>
                            {grade?.grade_id}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                  <Col md={2} className="teacherRoutingDD">
                    <select
                      className="principalGradeView"
                      name="section"
                      id="section"
                      onChange={(e) => handleSectionChangeToFetchLog(e)}
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
                      style={{ height: "45px" }}
                      type="date"
                      name="datepic"
                      placeholder="DateRange"
                      value={dateToFetchLog}
                      onChange={(e) => setDateToFetchLog(e.target.value)}
                    />
                  </Col>
                  <Col md={2} style={{ paddingTop: "20px" }}>
                    <Button
                      variant="primary"
                      onClick={fetchTeachersLogBook}
                      disabled={
                        !(
                          gradeToFetchLog &&
                          sectionToFetchLog &&
                          dateToFetchLog
                        )
                      }
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ paddingTop: "14px" }}>
                    <p
                      style={{
                        font: "normal normal bold 19px/27px Roboto",
                        position: "relative",
                        top: "13px",
                      }}
                    >
                      Class Teacher:
                    </p>{" "}
                    <p style={{ fontStyle: "italic", color: "blue" }}>
                      {princiViewLogBook?.log_book_data?.class_teacher_name}
                    </p>
                  </Col>
                  <Col md={1}></Col>
                  <Col md={4} style={{ paddingTop: "14px" }}>
                    <p
                      style={{
                        font: "normal normal bold 19px/27px Roboto",
                        position: "relative",
                        top: "13px",
                      }}
                    >
                      Day:
                    </p>{" "}
                    <p style={{ fontStyle: "italic", color: "blue" }}>
                      {princiViewLogBook?.log_book_data?.day}
                    </p>
                  </Col>
                  <Col md={1}></Col>
                  <Col md={3} style={{ paddingTop: "14px" }}>
                    <p
                      style={{
                        font: "normal normal bold 19px/27px Roboto",
                        position: "relative",
                        top: "13px",
                      }}
                    >
                      Date:
                    </p>{" "}
                    <p style={{ fontStyle: "italic", color: "blue" }}>
                      {princiViewLogBook?.log_book_data?.date}
                    </p>
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
                    {princiViewLogBook?.log_book_data?.log_record.map(
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
                    )}
                  </Table>
                  <Row style={{ padding: "10px" }}>
                    <Col md={3}>
                      <h6 style={{ textAlign: "left" }}>
                        Name of Absentees :{" "}
                      </h6>
                    </Col>
                    {
                      <Col md={9} style={{ textAlign: "left" }}>
                        {princiViewLogBook?.log_book_data?.name_of_absentees?.map(
                          (absentees, indx) => {
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
                      {princiViewLogBook?.log_book_data?.name_of_dress_defaulters?.map(
                        (dressDefaulter, indx) => {
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

                {/* <Row>
          <Col>
            <TableComponent column={column} data={mockData} />
          </Col>
        </Row> */}
              </div>
            </div>
            {/* <h1 style={{marginTop:"30%"}}> Principal Dashboard</h1> */}
            {/* <Row>
            <Col xs={16} md={8} style={{paddingLeft:"0px"}}>
                <DashboardContent />
            </Col>
            <Col xs={4} md={4}>
                <DashboardRightPanel />
            </Col>
        </Row> */}
          </div>
        </Col>
        <Col md={3} style={{ width: "25%", marginTop: "91px" }}>
          <Row>
            <Col md={6} className="princiRightPanel">
              <Row className="princiRightPanel-header">
                <Col md={12}>
                  <h4>Teacher's Schedule</h4>
                </Col>
              </Row>
              <Row style={{ marginTop: "14px" }}>
                <Col md={5}>
                  <select
                    className="teacherScheduleBlock"
                    name="weekDay"
                    id="weekDay"
                    onChange={(e) => handleWeekDayChange(e)}
                  >
                    <option value="">--Week Day--</option>
                    {weekDayOption?.map((weekDay) => {
                      return (
                        <option value={weekDay?.value}>{weekDay?.label}</option>
                      );
                    })}
                  </select>
                </Col>
                <Col md={1}></Col>
                <Col md={5}>
                  <select
                    className="teacherScheduleBlock"
                    name="teacher"
                    id="teacher"
                    onChange={(e) => handleTeacherChange(e)}
                  >
                    <option value="">--Teacher--</option>
                    {teacherData?.teachers?.map((teacher) => {
                      return (
                        <option value={teacher.teacher_id}>
                          {teacher.teacher_name}
                        </option>
                      );
                    })}
                  </select>
                </Col>

                {/* <Col md={2} style={{paddingRight:"25px"}}>
                  
                  {(teacherName && weekDayToFetch) !== '' && <FaCheckSquare onClick={fetchTeacherRoutine} style={{height:"40px", width:"40px", color:"blue", cursor:"pointer"}} />}
                  </Col> */}
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
                            >{`${routine.time_range} --- ${routine.subject_name}--${routine.grade} ${routine.section_name}`}</span>
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
    </>
  );
};

export default PDashboard;
