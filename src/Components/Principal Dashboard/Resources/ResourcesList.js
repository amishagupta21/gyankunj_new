import React, { useEffect } from "react";
import { Row, Col, ButtonGroup, Dropdown, Card, Button } from "react-bootstrap";
import { useState } from "react";
import AddResources from "./AddResources";
import { getResources } from "../../../ApiClient";
import Select from "react-select";
import PrincipalSidebar from "../PrincipalSidebar";

const Resources = () => {
  const [showAddResource, setShowAddResource] = useState(false);
  const [grade, setGrade] = useState("1");
  const [section, setSection] = useState("1");
  const [subject, setSubject] = useState("1");
  const [resourcesData, setResourcesData] = useState({});

  useEffect(() => {
    getResourcesData();
  }, []);

  const getResourcesData = () => {
    const grade_id = grade;
    const section_id = section;
    const subject_id = subject;
    getResources(grade_id, section_id, subject_id)
      .then((res) => setResourcesData(res.data))
      .then((err) => err);
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

  const SubjectOption = [
    { label: "Maths", value: "1" },
    { label: "English", value: "2" },
    { label: "Hindi", value: "3" },
  ];

  const handleGradeChange = (e) => {
    setGrade(e.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.value);
  };

  return (
    <>
      <div className="resourcesHeader">
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
            <h4>Resources</h4>
          </Col>
          <Col md={2}>
            <span>Grade</span>
            <Select
              className="reportHeading"
              placeholder="Select Grade"
              options={gradeOptions}
              onChange={(e) => handleGradeChange(e)}
              isSearchable={false}
            />
          </Col>
          <Col md={2}>
            <span>Section</span>
            <Select
              className="reportHeading"
              placeholder="Select Section"
              options={SectionOption}
              onChange={(e) => handleSectionChange(e)}
              isSearchable={false}
            />
          </Col>
          <Col md={2}>
            <span>Subject</span>
            <Select
              className="reportHeading"
              placeholder="Select Subject"
              options={SubjectOption}
              isSearchable={false}
              onChange={(e) => handleSubjectChange(e)}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="outline-primary"
              style={{ marginTop: "23px" }}
              onClick={getResourcesData}
            >
              Fetch Resources
            </Button>
          </Col>
          {/* <Col md={1} className='teacherRoutingDD'>
                <Button variant="outline-primary"
                onClick={handleShowModal}>
                  +
                </Button>{" "}
              </Col> */}
        </Row>
        <Row></Row>
        <div>
          <div className="ResourceSection">
            {resourcesData?.content_data?.map((resource, indx) => {
              return (
                <Card className="dashboardRightPanelCard">
                  <Row>
                    <Col md={10} className="resourceText">
                      {resource.content_name}
                    </Col>
                    <Col md={2} style={{ paddingTop: "14px" }}>
                      <div>
                        <Button className="readBtn">Read</Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      {showAddResource && (
        <AddResources
          show={showAddResource}
          onHide={() => {
            setShowAddResource(false);
          }}
        />
      )}
    </>
  );
};

export default Resources;
