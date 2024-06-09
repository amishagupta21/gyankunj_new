import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profilePic from "../Images/profilePic.jpg";
import Gyankoonj_logo from "../Images/Gyankoonj_logo.png";
import LoginPage from "./LoginPage";
import { FaAngleDown } from "react-icons/fa";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Offcanvas } from "react-bootstrap";
import SidebarContainer from "./SidebarContainer";

function Header({ isTabScreen, userData }) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isHoveredOnUser, setIsHoveredOnUser] = useState(false);

  const openLoginPage = () => {
    setShowLogin(true);
  };

  const logoutFunction = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleMouseEnter = () => {
    setIsHoveredOnUser(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredOnUser(false);
  };

  return (
    <>
      <Navbar className="shadow justify-content-between h-100 pe-2 ps-2">
        {isTabScreen && userData?.token && (
          <MenuOutlinedIcon onClick={() => setShowDrawer(!showDrawer)} />
        )}
        {(!isTabScreen || !userData?.token) && (
          <img className="h-100" src={Gyankoonj_logo} alt="Logo" />
        )}
        {userData?.token ? (
          <Nav className="ms-auto">
          <NavDropdown
            align="end"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title={
              <div className="profile-title">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: 40, height: 40, marginRight: 5 }}
                />
                <span className={`username ${isHoveredOnUser ? 'show' : ''}`}>
                  <strong className="ms-1 me-1">{userData.name}</strong>
                  <FaAngleDown />
                </span>
              </div>
            }
            id="basic-nav-dropdown"
            renderMenuOnMount={true}
          >
            <NavDropdown.Item disabled>{userData.role}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutFunction}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        ) : (
          <button className="btn-primary" onClick={openLoginPage}>
            Log In
          </button>
        )}
      </Navbar>
      <LoginPage show={showLogin} onHide={() => setShowLogin(false)} />
      <Offcanvas
        style={{ width: 270 }}
        show={showDrawer}
        onHide={setShowDrawer}
        placement="start"
      >
        <Offcanvas.Header style={{ height: 100 }} closeButton>
          <img className="h-100" src={Gyankoonj_logo} alt="Logo" />
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0" style={{ overflowX: "hidden" }}>
          <SidebarContainer
            userData={userData}
            onMenuItemClick={() => setShowDrawer(false)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
