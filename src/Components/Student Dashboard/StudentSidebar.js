import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    ProSidebar,
    ProSidebarProvider,
  } from "react-pro-sidebar";
  // import 'react-pro-sidebar/dist/css'
  import "./StudentSidebar.css";
  import dashboardImg from "../../Images/dashboardImg.svg";
  import masterRoutine from "../../Images/MasterRoutine.png";
  import LessonPlan from "../../Images/LessonPlan.png";
  import Attendance from "../../Images/Attendance.png";
  import Reports from "../../Images/Reports.png";
  import Resources from "../../Images/Resources.png";
  import Announcements from "../../Images/Announcements.png";
  import Notifications from "../../Images/Notifications.png";
  import SidebarBackground from "../../Images/SidebarBackground_1.png";
  import { Row, Col } from "react-bootstrap";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import * as myConstant from "../fileConstant";
  import { useEffect, useState } from "react";
  
  const loadIndex = {
    "/principalDashboard/dashboard": 0,
    "/principalDashboard/masterRoutine": 1,
    "/principalDashboard/lessonPlan": 2,
    "/principalDashboard/attendanceOverview": 3,
    "/principalDashboard/reports": 4,
    "/principalDashboard/resources": 5,
    "/principalDashboard/announcements": 6,
    "/principalDashboard/notifications": 7,
  };
  
  const StudentSidebar = () => {
    const [activeTab, setActiveTab] = useState(null);
  
    const navigate = useNavigate();
    const location = useLocation()
  
    useEffect(() => {
      const activeIndex = loadIndex[location];
      setActiveTab(activeIndex);
    }, [location]);
  
    function handleActive(indx) {
      setActiveTab(indx);
    }
  
  
    return (
      <div
        className="sidebarStyling"
        style={{ background: `url(${SidebarBackground})`, height: "991px" }}
      >
        <ProSidebar>
          <SidebarContent>
            <Menu className="sidebarMenu">
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 0 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={dashboardImg} />
                </Col>
                
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem
                    active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(0)}
                    className="menuItemStyle"
                  >
                    <Link to={myConstant.studentRoutesConfig.studentdashboard}>Dashboard
                      </Link>
                  </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 0 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={dashboardImg} />
                </Col>
                
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem
                    active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(0)}
                    className="menuItemStyle"
                  >
                    <Link to={myConstant.studentRoutesConfig.assignments}>Assignment
                      </Link>
                  </MenuItem>
                </Col>
              </Row>               
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 4 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={Reports} />
                </Col>
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem disabled active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(4)} className="menuItemStyle">
                    <Link to={myConstant.studentRoutesConfig.studentReport}> Report</Link>{" "}
                  </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 5 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={Resources} />
                </Col>
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(5)} className="menuItemStyle">
                    <Link to={myConstant.studentRoutesConfig.studentResources}> Resources</Link>{" "}
                  </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 6 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={Announcements} />
                </Col>
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(6)} className="menuItemStyle">
                    <Link to={myConstant.studentRoutesConfig.NoticeForStudent}>
                      {" "}
                      Notice{" "}
                    </Link>
                  </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner" style={{backgroundColor : activeTab == 7 ? "#FFFFFF" : ""}}>
                <Col md={2}>
                  <img alt="close" src={Notifications} />
                </Col>
                <Col md={10} style={{ textAlign: "left" }}>
                  <MenuItem active={activeTab == 0 ? true : false}
                    onClick={() => handleActive(7)} className="menuItemStyle">
                    <Link to={myConstant.studentRoutesConfig.NotificationsForStudent}>
                      {" "}
                      Notifications{" "}
                    </Link>{" "}
                  </MenuItem>
                </Col>
              </Row>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  };
  
  export default StudentSidebar;
  