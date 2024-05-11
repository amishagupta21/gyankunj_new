import React, { useEffect, useState } from "react";
import "./PrincipalDashboard.css";
import { Row, Col, Card } from "react-bootstrap";
import {
  attendanceOverview,
  getGradeDetails,
  getTeachersData,
  getTeacherRoutine,
} from "../../ApiClient";
import PLogBook from "./PLogBook";

const PDashboard = () => {
  const [overallAttendance, setOverallAttendance] = useState({});
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [gradeData, setGradeData] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [teacherRoutineData, setTeacherRoutineData] = useState({});
  const [weekDayToFetch, setWeekDayToFetch] = useState("");

  useEffect(() => {
    getAllTeachersData();
    fetchTeacherRoutine();
  }, [teacherName && weekDayToFetch]);

  useEffect(() => {
    getAttendanceOverview();
    getAllGradeDetails();
  }, [grade && section]);

  const sectionOptions = [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
    { label: "D", value: "4" },
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
  };

  const handleTeacherChange = (e) => {
    setTeacherName(e.target.value);
  };

  const handleWeekDayChange = (e) => {
    setWeekDayToFetch(e.target.value);
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
    });
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
                      {overallAttendance?.attendance_overview?.teacher?.present}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <span>Absent</span>
                  </Col>
                  <Col md={6}>
                    <p>
                      {overallAttendance?.attendance_overview?.teacher?.absent}
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
                      {gradeData?.grade_details?.grade_details?.map((grade) => {
                        return (
                          <option key={grade?.grade_id} value={grade?.grade_id}>
                            {grade?.grade_id}
                          </option>
                        );
                      })}
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
                          <option key={section?.value} value={section?.value}>
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
                      {overallAttendance?.attendance_overview?.student?.total}
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
                      {overallAttendance?.attendance_overview?.student?.present}
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
                      {overallAttendance?.attendance_overview?.student?.absent}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <PLogBook />
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
                        <option key={weekDay?.value} value={weekDay?.value}>
                          {weekDay?.label}
                        </option>
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
                        <option
                          key={teacher.teacher_id}
                          value={teacher.teacher_id}
                        >
                          {teacher.teacher_name}
                        </option>
                      );
                    })}
                  </select>
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
                          key={indx}
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
