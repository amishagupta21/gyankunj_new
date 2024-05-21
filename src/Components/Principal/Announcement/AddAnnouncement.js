import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { saveNotice, publishNotice } from "../../../ApiClient";

const AddAnnouncement = (props) => {
  const [noticeDescription, setNoticeDescription] = useState("");
  const [noticeSubject, setNoticeSubject] = useState("");
  const [visibilityData, setVisibilityData] = useState("");
  const [saveNoticeDetails, setSaveNoticeDetails] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  const visibilityOptions = [
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "teacher_and_student", label: "Teacher and Student" },
    { value: "student_and_parent", label: "Student and Parent" },
    { value: "teacher_and_parent", label: "Teacher and Parent" },
    { value: "all", label: "Everyone" },
  ];

  const saveNoticeData = () => {
    const data = {
      user_id: userDetails?.user_id,
      data: noticeDescription,
      notice_subject: noticeSubject,
    };
    saveNotice(data)
      .then((res) => {
        setSaveNoticeDetails(res.data);
      })
      .catch((err) => console.log("Notice Err", err));
  };

  const publishNoticeData = () => {
    const data = {
      notice_id: saveNoticeDetails.notice_id,
      visibility: visibilityData,
    };
    publishNotice(data)
      .then((res) => {
        console.log("Publish Notice Res", res.data);
        closeModal();
      })
      .catch((err) => console.log("Notice Err", err));
  };

  const closeModal = () => {
    props.onHide();
  };

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Add Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={{ marginBottom: "42px" }}>
              <Col md={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Notice Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Notice Subject"
                    onChange={(e) => setNoticeSubject(e.target.value)}
                    value={noticeSubject}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginBottom: "42px" }}>
              <Col md={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add Description"
                    value={noticeDescription}
                    onChange={(e) => setNoticeDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {saveNoticeDetails?.notice_id && (
                <Col md={12}>
                  <Select
                    placeholder="Select Visibility"
                    options={visibilityOptions}
                    isSearchable={false}
                    onChange={(e) => setVisibilityData(e.value)}
                  />
                </Col>
              )}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="outline-primary" style={{ alignItems: "center" }}>
            Reset
          </Button> */}
          <Button
            disabled={
              saveNoticeDetails?.notice_id ||
              !(noticeDescription && noticeSubject)
            }
            variant="outline-primary"
            onClick={saveNoticeData}
          >
            Save
          </Button>
          <Button
            disabled={!saveNoticeDetails?.notice_id}
            variant="outline-primary"
            onClick={publishNoticeData}
          >
            Publish
          </Button>
          <Button variant="outline-primary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAnnouncement;
