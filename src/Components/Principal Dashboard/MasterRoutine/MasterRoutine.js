import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Button, Table } from "react-bootstrap";
import "./MasterRoutine.css";
import AddRoutine from "./AddRoutine";
import axios from "axios";
import { getGradeDetails, viewMasterRoutine } from "../../../ApiClient";
import Select from "react-select";
import PrincipalSidebar from "../PrincipalSidebar";
import mockData from "../../../Mock Data/masterRoutineMockData.json";
import { FaCheckSquare } from "react-icons/fa";

const MasterRoutine = () => {
  const [showAddRoutine, setShowAddRoutine] = useState(false);
  const [masterRoutineData, setMasterRoutineData] = useState([]);
  const [fetchedRoutineData, setFetchedRoutineData] = useState([]);
  const [section, setSection] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [grade, setGrade] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [editingState, setEditingState] = useState(false);
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    // getMasterRoutine();
    viewMasterRoutineData();
    getAllGradeDetails();
  }, [weekDay, grade]);

  const handleShowModal = () => {
    setShowAddRoutine(true);
  };

  // const getMasterRoutine = () => {
  //   getMasterRoutineData()
  //   .then((res) => setMasterRoutineData(res.data))
  //   .catch((err) => console.log("error", err))
  // }

  const viewMasterRoutineData = () => {
    const day = weekDay;
    const grade_id = grade;
    viewMasterRoutine(day, grade_id)
      .then((res) => setMasterRoutineData(res.data))
      .then((err) => console.log("err - ", err));
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.value);
    setSectionName(e.label);
  };

  const handleDayChange = (e) => {
    setWeekDay(e.target.value);
  };

  const getAllGradeDetails = () => {
    getGradeDetails()
      .then((res) => setGradeData(res.data))
      .catch((err) => console.log(err));
  };

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

  const SectionOption = [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
    { label: "D", value: "4" },
  ];

  const DayOption = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
  ];

  const handleEditState = () => {
    setEditingState(!editingState);
  };

  console.log("masterRoutineData - ", masterRoutineData);

  return (
    <div className="container mt-4">
      <div className="routinemain">
        <div className="masterRoutineheader">
          <Row>
            <Col md={6} style={{ textAlign: "left", paddingLeft: "50px" }}>
              <h3>Master Routine</h3>
            </Col>
            <Col md={2}>
              <select
                className="principalGradeView"
                name="teacher"
                id="teacher"
                onChange={(e) => handleGradeChange(e)}
              >
                <option value="">--Grade--</option>
                {gradeData?.grade_details?.grade_details?.map((grade) => {
                  // console.log("grade - ", grade)
                  return (
                    <option key={grade?.grade_id} value={grade?.grade_id}>{grade?.grade_id}</option>
                  );
                })}
              </select>
            </Col>
            <Col md={2}>
              <select
                className="principalGradeView"
                name="weekDay"
                id="weekDay"
                onChange={(e) => handleDayChange(e)}
              >
                <option value="">--Week Day--</option>
                {DayOption?.map((weekDay) => {
                  return (
                    <option key={weekDay?.value} value={weekDay?.value}>{weekDay?.label}</option>
                  );
                })}
              </select>
            </Col>
            {/* <Col md={1}>
              {(grade && weekDay) && <FaCheckSquare onClick={viewMasterRoutineData} style={{height:"40px", width:"40px", color:"blue", cursor:"pointer"}} />} 
              </Col> */}
            <Col md={2} style={{ position: "relative", bottom: "22px" }}>
              <Button
                variant="outline-primary"
                onClick={handleShowModal}
                style={{ marginTop: "22px" }}
              >
                + Add Routine
              </Button>{" "}
            </Col>
          </Row>
        </div>
        <div className="routineSection">
          <Row>
            <Col md={5}></Col>
            <Col md={2}>
              <h4>{masterRoutineData.day}</h4>
            </Col>
            <Col md={5}></Col>
          </Row>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Grade</th>
                <th>1st</th>
                <th>2nd</th>
                <th>3rd</th>
                <th>4th</th>
                {/* <th style={{color: "#F3FAFF", backgroundColor:"#3F4954"}} rowSpan={6} >BREAK</th> */}
                <th>5th</th>
                <th>6th</th>
                <th>7th</th>
                <th>8th</th>
              </tr>
            </thead>

            {masterRoutineData?.status == "success" ? (
              <tbody className="routineTable">
                {/* <tr>
                  <td></td>
                  <td></td>
                </tr> */}

                {/* {masterRoutineData.time_table?.section_A && <tr style={{backgroundColor:"#064584"}}>   
<td></td>   
                  {masterRoutineData?.time_table?.section_A?.time_range?.map((timeRange) => {
                    return <td style={{color:"white"}}>{timeRange}</td>
                  })}  
                  </tr>} */}

                <tr style={{ backgroundColor: "#064584" }}>
                  <td></td>
                  <td style={{ color: "white" }}>07:45 - 08:25 AM</td>
                  <td style={{ color: "white" }}>08:25 - 09:05 AM</td>
                  <td style={{ color: "white" }}>09:05 - 09:45 AM</td>
                  <td style={{ color: "white" }}>09:45 - 10:25 AM</td>
                  <td style={{ color: "white" }}>10:45 - 11:25 AM</td>
                  <td style={{ color: "white" }}>11:25 - 12:05 PM</td>
                  <td style={{ color: "white" }}>12:05 - 12:45 AM</td>
                  <td style={{ color: "white" }}>12:45 - 01:25 PM</td>
                </tr>

                {/* SECTION A */}

                {/* {masterRoutineData.time_table?.section_A && <tr>
                <td></td>
              </tr>} */}
                {masterRoutineData.time_table?.section_A && (
                  <tr>
                    <td
                      className="gradeStyle"
                      style={{
                        color: "#F3FAFF",
                        backgroundColor: "#3F4954",
                      }}
                      rowSpan="3"
                    >
                      {masterRoutineData.time_table &&
                        `${masterRoutineData.grade} A`}
                    </td>
                  </tr>
                )}

                {masterRoutineData.time_table?.section_A && (
                  <tr>
                    {masterRoutineData.time_table?.section_A?.subject.map(
                      (subject) => {
                        return <td key={subject}>{subject}</td>;
                      }
                    )}
                  </tr>
                )}

                {masterRoutineData.time_table?.section_A && (
                  <tr>
                    {masterRoutineData.time_table?.section_A?.teacher.map(
                      (teacher) => {
                        return <td key={teacher}>{teacher}</td>;
                      }
                    )}
                  </tr>
                )}

                {/* sECTION B */}

                {masterRoutineData.time_table?.section_B && (
                  <tr>
                    <td
                      className="gradeStyle"
                      style={{
                        color: "#F3FAFF",
                        backgroundColor: "#3F4954",
                      }}
                      rowSpan="3"
                    >
                      {masterRoutineData.time_table &&
                        `${masterRoutineData.grade} B`}
                    </td>
                  </tr>
                )}

                {masterRoutineData.time_table?.section_B && (
                  <tr>
                    {masterRoutineData.time_table?.section_B?.subject.map(
                      (subject) => {
                        return <td key={subject}>{subject}</td>;
                      }
                    )}
                  </tr>
                )}

                {masterRoutineData.time_table?.section_B && (
                  <tr>
                    {masterRoutineData.time_table?.section_B?.teacher.map(
                      (teacher) => {
                        return <td>{teacher}</td>;
                      }
                    )}
                  </tr>
                )}

                {/* sECTION C */}

                {masterRoutineData.time_table?.section_C && (
                  <tr>
                    <td
                      className="gradeStyle"
                      style={{
                        color: "#F3FAFF",
                        backgroundColor: "#3F4954",
                      }}
                      rowSpan="3"
                    >
                      {masterRoutineData.time_table &&
                        `${masterRoutineData.grade} C`}
                    </td>
                  </tr>
                )}

                {masterRoutineData.time_table?.section_C && (
                  <tr>
                    {masterRoutineData.time_table?.section_C?.subject.map(
                      (subject) => {
                        return <td key={subject}>{subject}</td>;
                      }
                    )}
                  </tr>
                )}

                {masterRoutineData.time_table?.section_C && (
                  <tr>
                    {masterRoutineData.time_table?.section_C?.teacher.map(
                      (teacher) => {
                        return <td>{teacher}</td>;
                      }
                    )}
                  </tr>
                )}

                {/* sECTION D */}

                {masterRoutineData.time_table?.section_D && (
                  <tr>
                    <td
                      className="gradeStyle"
                      style={{
                        color: "#F3FAFF",
                        backgroundColor: "#3F4954",
                      }}
                      rowSpan="3"
                    >
                      {masterRoutineData.time_table &&
                        `${masterRoutineData.grade} D`}
                    </td>
                  </tr>
                )}

                {masterRoutineData.time_table?.section_D && (
                  <tr style={{ backgroundColor: "#c6d0da" }}>
                    {masterRoutineData.time_table?.section_D?.subject.map(
                      (subject) => {
                        return <td key={subject}>{subject}</td>;
                      }
                    )}
                  </tr>
                )}

                {masterRoutineData.time_table?.section_D && (
                  <tr style={{ backgroundColor: "#c6d0da" }}>
                    {masterRoutineData.time_table?.section_D?.teacher.map(
                      (teacher) => {
                        return <td>{teacher}</td>;
                      }
                    )}
                  </tr>
                )}

                {/* sECTION E */}

                {masterRoutineData.time_table?.section_E && (
                  <tr>
                    <td
                      className="gradeStyle"
                      style={{
                        color: "#F3FAFF",
                        backgroundColor: "#3F4954",
                      }}
                      rowSpan="3"
                    >
                      {masterRoutineData.time_table &&
                        `${masterRoutineData.grade} E`}
                    </td>
                  </tr>
                )}

                {/* {masterRoutineData.time_table?.section_E && <tr style={{backgroundColor:"#064584"}}>      
                  {masterRoutineData?.time_table?.section_E?.time_range?.map((timeRange) => {
                    return <td style={{color:"white"}}>{timeRange}</td>
                  })}  
                  </tr>} */}

                {masterRoutineData.time_table?.section_E && (
                  <tr>
                    {masterRoutineData.time_table?.section_E?.subject.map(
                      (subject) => {
                        return <td key={subject}>{subject}</td>;
                      }
                    )}
                  </tr>
                )}

                {masterRoutineData.time_table?.section_E && (
                  <tr>
                    {masterRoutineData.time_table?.section_E?.teacher.map(
                      (teacher) => {
                        return <td key={teacher}>{teacher}</td>;
                      }
                    )}
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={10}>No Routine Available!!</td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      </div>
      {showAddRoutine && (
        <AddRoutine
          show={showAddRoutine}
          onHide={() => {
            setShowAddRoutine(false);
          }}
          masterRoutineData={masterRoutineData}
        />
      )}
    </div>
  );
};

export default MasterRoutine;
