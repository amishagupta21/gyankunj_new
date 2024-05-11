import React from "react";
import { Row, Col, Table, ProgressBar, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { viewAttendanceReport, getGradeDetails } from "../../ApiClient";
import { useEffect } from "react";

const AttendanceOverview = () => {
  const [gradeData, setGradeData] = useState([]);
  const [yearData, setYear] = useState("");
  const [teacherTabActive, setTeacherTabActive] = useState(true);
  const [sectionSelect, setSectionSelect] = useState("");
  const [classSelect, setClassSelect] = useState("");
  const [teacherTotalAttendance, setTeacherTotalAttendance] = useState({});
  const [studentTotalAttendance, setStudentTotalAttendance] = useState({});

  useEffect(() => {
    getAllGradeDetails();
  }, []);

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const yearOptions = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
  ];

  const now = "100";

  const handleGradeChange = (e) => {
    setClassSelect(e.target.value);
  };

  const handleSectionSelectChange = (e) => {
    setSectionSelect(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const getFullAttendanceData = () => {
    const grade_id = classSelect;
    const section_id = sectionSelect;
    const year = yearData;
    const user_type = teacherTabActive ? "teacher" : "student";
    viewAttendanceReport(grade_id, section_id, year, user_type)
      .then((res) => {
        setTeacherTotalAttendance(res.data);
        setStudentTotalAttendance(res.data);
      })
      .then((err) => console.log(err));
  };

  const showStudentAttendance = () => {
    setTeacherTabActive(false);
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="attendanceSectionOverview" style={{ height: "74px" }}>
        <Row
          style={{
            height: "74px",
            boxShadow: "0px 3px 6px #B4B3B329",
            position: "relative",
            left: "12px",
            width: "100%",
          }}
        >
          <Col md={6}>
            <h4>Attendance Overview</h4>
          </Col>
        </Row>
      </div>

      <div>
        <Row
          style={{ padding: "0px 51px", position: "relative", bottom: "11px" }}
        >
          <Col
            md={6}
            style={{
              backgroundColor: teacherTabActive ? "cornflowerblue" : "",

              borderRadius: teacherTabActive ? "10px" : "",
              cursor: "pointer",
            }}
            onClick={() => setTeacherTabActive(true)}
          >
            <p
              style={{
                font: "normal normal bold 19px/34px Roboto",
                letterSpacing: "0px",
                color: !teacherTabActive ? "#2A2D2F" : "white",
                opacity: "1",
                position: "relative",
                top: "7px",
              }}
            >
              Teacher
            </p>
          </Col>
          <Col
            md={6}
            style={{
              backgroundColor: !teacherTabActive ? "cornflowerblue" : "",
              borderRadius: !teacherTabActive ? "10px" : "",
              cursor: "pointer",
            }}
            onClick={showStudentAttendance}
          >
            <p
              style={{
                font: "normal normal bold 19px/34px Roboto",
                letterSpacing: "0px",
                color: !teacherTabActive ? "white" : "#2A2D2F",
                opacity: "1",
                position: "relative",
                top: "7px",
              }}
            >
              Student
            </p>
          </Col>
        </Row>
      </div>

      {!teacherTabActive ? (
        <div className="teacherAndStdAttendance">
          <Row
            style={{
              height: "74px",
              boxShadow: "0px 3px 6px #B4B3B329",
              position: "relative",
              left: "12px",
              width: "100%",
            }}
          >
            <Col md={5}>
              <h4>Students Attendance</h4>
            </Col>
            <Col md={2} className="teacherRoutingDD">
              <select
                className="principalGradeView"
                name="grade"
                id="grade"
                onChange={(e) => handleGradeChange(e)}
              >
                <option value="">--Grade--</option>
                {gradeData?.grade_details?.grade_details?.map((grade) => {
                  return (
                    <option value={grade?.grade_id}>{grade?.grade_id}</option>
                  );
                })}
              </select>
            </Col>
            <Col md={2} className="teacherRoutingDD">
              <Form.Select
                className="lessonPlanSubject"
                name="section"
                id="section"
                style={{
                  width: "165px",
                  height: "44px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                }}
                onChange={(e) => handleSectionSelectChange(e)}
              >
                <option value="">--Section--</option>
                {sectionOptions?.map((section, indx) => {
                  return (
                    <option value={section?.value}>{section?.label}</option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col md={2} className="teacherRoutingDD">
              <span>
                <select
                  className="principalGradeView"
                  name="year"
                  id="year"
                  onChange={(e) => handleYearChange(e)}
                >
                  <option value="">--Year--</option>
                  {yearOptions?.map((year) => {
                    return <option value={year.value}>{year.label}</option>;
                  })}
                </select>
              </span>
            </Col>
            <Col md={1}>
              <Button
                variant="outline-primary"
                style={{ marginTop: "17px" }}
                onClick={getFullAttendanceData}
                disabled={!(classSelect && sectionSelect && yearData)}
              >
                Submit
              </Button>
            </Col>
          </Row>
          <div className="routineSection">
            <div>
              <Row>
                <Col md={2}>
                  <h6
                    style={{
                      marginLeft: "12px",
                      paddingTop: "5px",
                      textAlign: "center",
                      font: "normal normal medium 14px/15px Roboto",
                      letterSpacing: "0px",
                      color: "#821CE8",
                      opacity: "1",
                      background: "#F1E7FC 0% 0% no-repeat padding-box",
                      borderRadius: "0px 8px",
                      width: "120px",
                      height: "35px",
                    }}
                  >
                    Class Teacher
                  </h6>
                </Col>
                <Col md={3} style={{ textAlign: "initial" }}>
                  {studentTotalAttendance.class_teacher_name}
                </Col>
              </Row>
            </div>
            <Table striped hover>
              <thead>
                <tr
                  style={{
                    background: "#7A9ABF 0% 0% no-repeat padding-box",
                    borderRadius: "4px 4px 0px 0px",
                    opacity: "1",
                  }}
                >
                  <th style={{ width: "100px" }}>Roll No.</th>
                  <th style={{ width: "230px" }}>Students Name</th>
                  <th style={{ width: "205px" }}>No. of days present</th>
                  <th style={{ width: "205px" }}>No. of days absent</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              {studentTotalAttendance?.student_report?.attendance_data.map(
                (studentAttendance, indx) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{studentAttendance.roll_no}</td>
                        <td>{studentAttendance.student_name}</td>
                        <td>{studentAttendance.present_days}</td>
                        <td>{studentAttendance.absence_count}</td>
                        <td>
                          <ProgressBar
                            variant="progressBarColour"
                            now={studentAttendance.attendance_percentage}
                            label={`${studentAttendance.attendance_percentage} %`}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              )}
            </Table>
          </div>
        </div>
      ) : (
        <div className="teacherAndStdAttendance">
          <Row
            style={{
              height: "74px",
              boxShadow: "0px 3px 6px #B4B3B329",
              position: "relative",
              left: "12px",
              width: "100%",
            }}
          >
            <Col md={5}>
              <h4>Teachers Attendance</h4>
            </Col>
            <Col md={2} className="teacherRoutingDD">
              {/* <span>
                    <Select placeholder="Select Section" isSearchable={false} options={sectionOptions} onChange={e => handleSectionSelectChange(e)} />
                  </span> */}
            </Col>
            <Col md={2} className="teacherRoutingDD">
              {/* <span>
                  <Select placeholder="Select Class" isSearchable={false} options={gradeOptions} onChange={e => handleClassChange(e)} />
                  </span> */}
            </Col>
            <Col md={2} className="teacherRoutingDD">
              <span>
                {/* <Select placeholder="Select Year" isSearchable={false} options={yearOptions} onChange={e => handleYearChange(e)} /> */}
                <select
                  className="principalGradeView"
                  name="year"
                  id="year"
                  onChange={(e) => handleYearChange(e)}
                >
                  <option value="">--Year--</option>
                  {yearOptions?.map((year) => {
                    return <option value={year.value}>{year.label}</option>;
                  })}
                </select>
              </span>
            </Col>
            <Col md={1}>
              <Button
                variant="outline-primary"
                style={{ marginTop: "17px" }}
                onClick={getFullAttendanceData}
                disabled={!yearData}
              >
                Submit
              </Button>
            </Col>
            <div className="routineSection">
              <div>
                {/* <Row>
                <Col md={2}>
                <h6 style={{ marginLeft: "12px", paddingTop:"5px" ,textAlign: "center", font: "normal normal medium 14px/15px Roboto", letterSpacing: "0px", color: "#821CE8", opacity: "1", background: "#F1E7FC 0% 0% no-repeat padding-box", borderRadius: "0px 8px", width: "120px", height: "35px"}}>Teacher</h6>
                </Col>
                <Col md={3} style={{textAlign: "initial"}}>
                    Julie
                </Col>
              </Row> */}
              </div>
              <Table striped hover>
                <thead>
                  <tr
                    style={{
                      background: "#7A9ABF 0% 0% no-repeat padding-box",
                      borderRadius: "4px 4px 0px 0px",
                      opacity: "1",
                    }}
                  >
                    <th style={{ width: "100px" }}>Emp ID</th>
                    <th style={{ width: "230px" }}>Teacher Name</th>
                    <th style={{ width: "205px" }}>No. of days present</th>
                    <th style={{ width: "205px" }}>No. of days absent</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                {teacherTotalAttendance?.teacher_report?.attendance_data.map(
                  (teacherAttendance, indx) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{teacherAttendance.teacher_id}</td>
                          <td>{teacherAttendance.teacher_name}</td>
                          <td>{teacherAttendance.present_days}</td>
                          <td>{teacherAttendance.absence_count}</td>
                          <td>
                            <ProgressBar
                              variant="progressBarColour"
                              now={teacherAttendance.attendance_percentage}
                              label={`${now} %`}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                )}
              </Table>
            </div>
          </Row>
        </div>
      )}
    </div>
  );
};

export default AttendanceOverview;
