import React, { useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import "../Styles/LoginPage.css";
import loginImage from "../Images/loginImage.png";
import closeBtn from "../Images/closeBtn.png";
import { useNavigate } from "react-router-dom";
import LoginError from "./LoginError";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@mui/material";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const closeLoginModal = () => {
    props.onHide();
  };

  const loginMember = async () => {
    const base64 = require("base-64");
    const url = "http://13.200.112.20:5005/login";
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode(`${userName}:${password}`)
    );

    try {
      const response = await fetch(url, { method: "POST", headers });
      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("UserData", JSON.stringify(data));
        props.onHide();

        if (data.role === "ADMIN" || data.role === "PRINCIPAL") {
          navigate("/principalDashboard/dashboard");
        } else if (data.role === "TEACHER") {
          navigate("/teacherDashboard/dashboard");
        } else if (data.role === "STUDENT") {
          navigate("/studentDashboard/dashboard");
        }
      } else {
        setErrorMessage(true);
        setUserName("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                <h1
                  className="text-center"
                  style={{
                    color: "#000",
                    fontFamily: "Poppins",
                    fontSize: "34px",
                    fontWeight: 600,
                  }}
                >
                  Welcome to Gyankunj
                </h1>
                <h1
                  className="text-center"
                  style={{
                    color: "#0B1785",
                    font: "normal normal bold 26px/34px Roboto",
                  }}
                >
                  Digitalize your school in minutes
                </h1>
                <div className="loginFormContent">
                  <Form>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                      <Form.Label
                        style={{
                          color: "#000",
                          fontFamily: "Poppins",
                          fontSize: "20px",
                          fontWeight: 500,
                        }}
                      >
                        User name
                      </Form.Label>
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
                      <Form.Label
                        style={{
                          color: "#000",
                          fontFamily: "Poppins",
                          fontSize: "20px",
                          fontWeight: 500,
                        }}
                      >
                        Password
                      </Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{
                            borderRadius: "40px",
                            border: "2px solid #49BBBD",
                            paddingRight: "40px",
                          }}
                        />
                        {showPassword ? (
                          <FaEyeSlash
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <FaEye
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group>
                      <a href="/">Forgot password?</a>
                    </Form.Group>
                    <Button
                      variant="contained"
                      className="mt-4"
                      onClick={loginMember}
                      disabled={!(userName && password)}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
            <Col md={1}>
              <img
                alt="close"
                src={closeBtn}
                onClick={closeLoginModal}
                style={{ position: "relative", top: "15px", cursor: "pointer" }}
              />
            </Col>
          </Row>
        </div>
      </Modal>

      {errorMessage && (
        <LoginError show={errorMessage} onHide={() => setErrorMessage(false)} />
      )}
    </>
  );
};

export default LoginPage;
