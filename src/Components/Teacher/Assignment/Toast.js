import React from 'react';
import Toast from 'react-bootstrap/Toast';

const CustomToast = ({ show, setShow, data }) => {

    return (
        <div style={{position:"absolute",bottom:"0px",right:"0px",zIndex:"999"}}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>{data.name}</small>
                </Toast.Header>
                <Toast.Body>{data.message}</Toast.Body>
            </Toast>
        </div>
    )
}

export default CustomToast;