import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import "../Styles/LoginPage.css";
import loginImage from "../Images/loginImage.png";
import closeBtn from "../Images/closeBtn.png";
import * as myConstant from './fileConstant'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../ApiClient'
import LoginError from './LoginError'
import { trackPromise } from "react-promise-tracker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = (props) => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState('')
  const [userName, setUserName] = useState('')
  const [passwordd, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const closeLoginModal = () => {
    props.onHide()
  }

  const loginMember = (e) => {
    let base64 = require("base-64");

    let url = "http://13.200.112.20:5005/login";
    let username = userName;
    let password = passwordd;

    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );
    console.log(username, password);
    console.log("HEADERS", headers.get("Authorization"));
    let data = trackPromise(fetch(url, { method: "POST", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data - ", data);
        if (data.status === "success") {
          let user = localStorage.setItem("UserData", JSON.stringify(data));
          props.onHide();
          if (data.role === 'ADMIN' || data.role === 'PRINCIPAL') {
            navigate('/principalDashboard/dashboard');
          }
          else if (data.role === 'TEACHER') {
            navigate({
              pathname: `${myConstant.teacherRoutesConfig.teacherdashboard}`,
              state: `${myConstant.teacherRoutesConfig.teacherdashboard}`,
            });
          }
          else if (data.role === 'STUDENT') {
            navigate({
              pathname: `${myConstant.studentRoutesConfig.studentdashboard}`,
              state: `${myConstant.studentRoutesConfig.studentdashboard}`,
            });
          }

        } else {
          setErrorMessage(true);
          setUserName("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      }));
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <div className="ModalContentMain">

          <Row>
            <Col md={3}>
              <div className="loginImage">
                <img
                  className="loginImageContent"
                  alt="login"
                  src={loginImage}
                />
              </div>
            </Col>
            <Col md={8}>
              <div className="loginForm">
                <h1 style={{
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "34px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  textAlign: "center"
                }}>Welcome to Gyankunj</h1>

                <h1 style={{ textAlign: "center", font: "normal normal bold 26px/34px Roboto", letterSpacing: "0px", color: "#0B1785" }}>Digitalize your school in minutes</h1>
                {/* <h1 style={{ textAlign: "center", font: "normal normal bold 26px/34px Roboto", letterSpacing: "0px", color: "#5AB6DE" }}> with Gyankunj</h1> */}
                <div className="loginFormContent">
                  <Form>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                      <Form.Label style={{
                        color: "#000",
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal"
                      }} >User name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter User ID"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{
                          borderRadius: "40px",
                          border: "2px solid #49BBBD",
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label style={{
                        color: "#000",
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal"
                      }} >Password</Form.Label>
                        <div style={{ position: 'relative' }}>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={passwordd}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderRadius: "40px",
            border: "2px solid #49BBBD",
            paddingRight: "40px" 
          }}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
        />
      </div>
                    </Form.Group>
                    <Form.Group>
                      <a href="#">Forgot password?</a>
                    </Form.Group>
                    <Button variant="primary" className="loginBtn" onClick={loginMember} disabled={!(userName && passwordd)}>
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
            <Col md={1}>
              <img alt="close" src={closeBtn} onClick={closeLoginModal} style={{ position: "relative", top: "15px", cursor: "pointer" }} />
            </Col>
          </Row>
        </div>
      </Modal>

      {errorMessage && <LoginError show={errorMessage} onHide={() => { setErrorMessage(false) }} />}

    </>
  );
};

export default LoginPage;
