import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { viewStudentAttendance, getGradeDetails } from "../../../ApiClient";
import Select from "react-select";

const TeacherAttendance = () => {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [sectionSelect, setSectionSelect] = useState("");
  const [gradeToFetch, setGrade] = useState("");
  const [gradeData, setGradeData] = useState([]);
  const [monthData, setMonth] = useState("");

  useEffect(() => {
    getAllGradeDetails();
  }, []);

  // useEffect(() => {
  //   fetchStudentAttendance()
  // }, [gradeToFetch, sectionSelect, monthData])

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

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const sectionOptions = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "4", label: "D" },
  ];

  const fetchStudentAttendance = () => {
    const grade = gradeToFetch;
    const section = sectionSelect;
    const month = monthData;
    viewStudentAttendance(grade, section, month)
      .then((res) => {
        setStudentAttendance(res.data);
        console.log("Attendance - ", res.data);
      })
      .catch((err) => {
        console.log("Attendance Error - ", err);
      });
  };

  const handleSectionSelectChange = (e) => {
    setSectionSelect(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.value);
  };

  const handleClassChange = (e) => {
    setGrade(e.target.value);
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
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
        <Col md={4}>
          <h4>Attendance</h4>
        </Col>
        <Col md={2} className="teacherRoutingDD">
          {/* <span>
                    <Select placeholder="Select Section" isSearchable={false} options={sectionOptions} onChange={e => handleSectionSelectChange(e)} />
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
              return <option value={grade?.grade_id}>{grade?.grade_id}</option>;
            })}
          </select>
        </Col>
        <Col md={2} className="teacherRoutingDD">
          {/* <span>
                    <Select
                      placeholder="Select Class"
                      isSearchable={false}
                      options={gradeOptions}
                      onChange={(e) => handleClassChange(e)}
                    />
                  </span> */}
          <select
            className="principalGradeView"
            name="section"
            id="section"
            onChange={(e) => handleSectionSelectChange(e)}
          >
            <option value="">--Section--</option>
            {sectionOptions?.map((section) => {
              return <option value={section.value}>{section.label}</option>;
            })}
          </select>
        </Col>
        <Col md={2} className="teacherRoutingDD">
          <span>
            <Select
              placeholder="Select Month"
              isSearchable={false}
              options={monthOptions}
              onChange={(e) => handleMonthChange(e)}
            />
          </span>
        </Col>
        <Col md={2} className="teacherRoutingDD">
          <span>
            <Button
              disabled={!(gradeToFetch && sectionSelect && monthData)}
              variant="primary"
              onClick={fetchStudentAttendance}
            >
              Submit
            </Button>
          </span>
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
              {studentAttendance?.class_teacher}
            </Col>
          </Row>
        </div>
        <Table bordered striped hover responsive>
          <thead>
            <tr
              style={{
                background: "#7A9ABF 0% 0% no-repeat padding-box",
                borderRadius: "4px 4px 0px 0px",
                opacity: "1",
                overflow: "auto",
              }}
            >
              <th>Roll No.</th>
              <th>Students Name</th>
              <th>%</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
              <th>19</th>
              <th>20</th>
              <th>21</th>
              <th>22</th>
              <th>23</th>
              <th>24</th>
              <th>25</th>
              <th>26</th>
              <th>27</th>
              <th>28</th>
              <th>29</th>
              <th>30</th>
              <th>31</th>
            </tr>
          </thead>
          {/* {studentTotalAttendance?.student_report?.attendance_data.map(
                    (studentAttendance, indx) => {
                      return ( */}
          <tbody>
            {studentAttendance?.student_attendance?.length > 0 ? (
              studentAttendance?.student_attendance?.map((attendance, indx) => {
                return (
                  <tr>
                    <td>{attendance.roll_no}</td>
                    <td>{attendance.name}</td>
                    <td>{attendance.attendance_percentage}</td>

                    {Object.entries(attendance?.attendance)?.map(
                      ([key, value]) => {
                        return (
                          <td>
                            <div
                              className={
                                value.toString() === "Present"
                                  ? "present"
                                  : "absent"
                              }
                            ></div>
                          </td>
                        );
                      }
                    )}
                    {/* <td>{attendance?.attendance.value}</td> */}
                  </tr>
                );
              })
            ) : (
              <td
                style={{
                  height: "134px",
                  paddingTop: "62px",
                  font: "normal normal normal 21px/21px Roboto",
                }}
                colSpan={34}
              >
                Select Grade, Section and Month to view Student's attendance
              </td>
            )}
          </tbody>
          {/* );
                    }
                  )} */}
        </Table>
      </div>
    </div>
  );
};

export default TeacherAttendance;
