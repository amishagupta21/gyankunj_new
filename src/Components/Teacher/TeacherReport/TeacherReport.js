import React from "react";
import { Row, Col } from "react-bootstrap";
import SadImg from "../../../Images/SadImg.png";

const TeacherReport = () => {
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
          <h4>Report</h4>
        </Col>
        {/* <Col md={2}>
            <span>Section</span>
            <Select className='reportHeading' placeholder="Select Section" options={SectionOption} onChange={e => handleSectionChange(e)} isSearchable={false} />
                
            </Col>
            <Col md={2}>
            <span>Grade</span>
            <Select className='reportHeading' placeholder="Select Grade" options={gradeOptions} onChange={e => handleGradeChange(e)} isSearchable={false} />
                
            </Col>
            <Col md={2}>
            <span>Report</span>
            <Select className='reportHeading' placeholder="Select Report" options={ReportOption} isSearchable={false} />
                
            </Col>
            <Col md={2}>
            <Button variant="outline-primary" style={{marginTop: "19px"}} onClick={getReportsData}>Check Reports</Button>
            </Col> */}
      </Row>
      {/* <div className="routineSection">
            <div>
              <Row>
                <Col md={2}>
                <h6 style={{ marginLeft: "12px", paddingTop:"5px" ,textAlign: "center", font: "normal normal medium 14px/15px Roboto", letterSpacing: "0px", color: "#821CE8", opacity: "1", background: "#F1E7FC 0% 0% no-repeat padding-box", borderRadius: "0px 8px", width: "120px", height: "35px"}}>Teacher</h6>
                </Col>
                <Col md={3} style={{textAlign: "initial"}}>
                    Julie
                </Col>
              </Row>
            </div>
            <Table striped hover>
              <thead>
                <tr style={{background: "#7A9ABF 0% 0% no-repeat padding-box", borderRadius: "4px 4px 0px 0px", opacity: "1"}}>
                  <th style={{width:"100px"}}>Roll No.</th>
                  <th style={{width:"230px"}}>Students Name</th>
                  <th style={{width:"205px"}}>No. of days present</th>
                  <th style={{width:"205px"}}>No. of days absent</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
                <tr>
                <td>1</td>
                  <td>Asha</td>
                  <td>20</td>
                  <td>0</td>
                  <td><ProgressBar variant="progressBarColour" now={now} label={`${now} %`} /></td>                 
                </tr>
              </tbody>
            </Table>
          </div> */}
      <Row>
        <Col md={12}>
          <h1
            style={{
              position: "relative",
              top: "100px",
              color: "#0071FF",
              font: "normal normal normal 29px/26px Roboto",
            }}
          >
            Since you are new here, it will take some time to prepare your
            report card!!
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <img src={SadImg} style={{ position: "relative", top: "150px" }} />
        </Col>
      </Row>
    </div>
  );
};

export default TeacherReport;
