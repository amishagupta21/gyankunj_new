import React from "react";
import { Button, Modal } from "react-bootstrap";

const LoginError = (props) => {
  

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please provide correct credentials</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={props.onHide}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginError;
