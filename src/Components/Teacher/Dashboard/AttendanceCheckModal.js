import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import {saveAttendance } from '../../../ApiClient'

const CheckAttendance = (props) => {

    const[verifyAndClose, setVerifyAndClose] = useState(false)


    const takeAttendance = () => {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const newData = `${yyyy}-${mm}-${dd}`
        const attendanceData = {
          "absentees": props.absenteesList,
          "dress_defaulters": props.dressDList,
          "date": newData
        }
        saveAttendance(attendanceData)
        .then((res) => props.closeAndLoad())
        .catch((err) => console.log('Attendance err - ', err))
      }
  

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Verify and Submit Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={3}>
                Absentees : 
            </Col>
            <Col md={9} style={{height: "fit-content", width:"fit-content", maxWidth: "526px", background: "0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)", boxShadow: "rgba(180, 179, 179, 0.16) 0px 7px 6px", borderRadius: "5px"}}>
                {props?.absenteesValue?.map((absentee, indx) => {
                    return (
                        `${indx+1}. ${absentee}, `
                    )
                })}
            </Col>
          </Row>
          <Row style={{marginTop:"30px"}}>
            <Col md={3}>
                Dress Defaulter : 
            </Col>
            <Col md={9} style={{height: "fit-content", width:"fit-content", maxWidth: "526px", background: "0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)", boxShadow: "rgba(180, 179, 179, 0.16) 0px 7px 6px", borderRadius: "5px"}}>
            {props?.dressDValue?.map((dressD, indx) => {
                    return (
                        `${indx+1}. ${dressD}, `
                    )
                })}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="outline-primary" style={{ alignItems: "center" }} onClick={resetData}>
            Reset
          </Button> */}
          <Button variant="outline-primary" onClick={takeAttendance}>Verified</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckAttendance;
