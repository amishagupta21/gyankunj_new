import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AddAnnouncement from "./AddAnnouncement";
import "./noticeCss.css";
import { viewAllNotice } from "../../../ApiClient";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import dayjs from "dayjs";

const Announcements = () => {
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [allNotice, setAllNotice] = useState({});
  const [hideResponse, setHideResponse] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  useEffect(() => {
    allNoticesData();
  }, []);

  const handleShowModal = () => {
    setShowAddAnnouncement(true);
  };

  const allNoticesData = () => {
    const user_id = userDetails.user_id;
    viewAllNotice(user_id)
      .then((res) => setAllNotice(res.data))
      .catch((err) => console.log("Notices err - ", err));
  };

  const closeAndLoad = () => {
    setShowAddAnnouncement(false);
    allNoticesData();
  };

  const showPublishModal = (noticeId) => {
    console.log("notice - ", noticeId);
    setShowAddAnnouncement(true);
  };

  const showResponseHandler = (id) => {
    let openHandler = [...hideResponse];
    openHandler.push(id);
    setHideResponse([...openHandler]);
  };

  const hideResponseHandler = (id) => {
    let openHandler = [...hideResponse];
    let findindex = openHandler.indexOf(id);

    if (findindex > -1) {
      openHandler.splice(findindex, 1);
      setHideResponse([...openHandler]);
    }
  };

  return (
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
        <Col md={7}>
          <h4>Notice</h4>
        </Col>
        <Col md={2} className="teacherRoutingDD"></Col>
        <Col md={3} className="teacherRoutingDD">
          <Button variant="outline-primary" onClick={handleShowModal}>
            + Add Notice
          </Button>{" "}
        </Col>
      </Row>
      {allNotice?.status == "failure" ? (
        <Row style={{ height: "93px" }}>
          <Col md={12} style={{ paddingTop: "30px" }}>
            <span className="failureMessage">{allNotice.message}</span>
          </Col>
        </Row>
      ) : (
        <div>
          {allNotice?.notices?.map((notice, indx) => {
            return (
              <fieldset>
                <Row className="lessonData">
                  <Col md={1} style={{ textAlign: "left" }}>
                    {hideResponse?.includes(notice?.notice_id) ? (
                      <FaAngleUp
                        style={{ height: "25px", width: "25px", color: "blue" }}
                        onClick={() => hideResponseHandler(notice?.notice_id)}
                      />
                    ) : (
                      <FaAngleDown
                        style={{ height: "25px", width: "25px", color: "blue" }}
                        onClick={() => showResponseHandler(notice?.notice_id)}
                      />
                    )}
                  </Col>

                  <Col
                    md={11}
                    className={
                      !hideResponse.includes(notice?.notice_id)
                        ? "noticeStyle"
                        : "noticeStyleExpanded"
                    }
                  >
                    {<h6 className="noticeHeader">{notice?.notice_subject}</h6>}
                    {notice?.published_at ? (
                      <p className="noticeTime">
                        {dayjs(notice?.published_at).format("DD-MM-YYYY")}
                      </p>
                    ) : (
                      <p className="notPubnoticeTime">
                        Not yet published.{" "}
                        <button
                          style={{
                            fontStyle: "italic",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => showPublishModal(notice?.notice_id)}
                        >
                          Click here
                        </button>{" "}
                        to publish.
                      </p>
                    )}
                    {hideResponse.includes(notice?.notice_id) && (
                      <Row>
                        <Col md={12}>
                          <h6 className="descriptionHeader">Description :</h6>
                          <p className="descriptionData">
                            {notice?.notice_data}
                          </p>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              </fieldset>
            );
          })}
        </div>
      )}
      {showAddAnnouncement && (
        <AddAnnouncement
          show={showAddAnnouncement}
          onHide={() => {
            setShowAddAnnouncement(false);
          }}
          closeAndLoad={closeAndLoad}
        />
      )}
    </div>
  );
};

export default Announcements;
