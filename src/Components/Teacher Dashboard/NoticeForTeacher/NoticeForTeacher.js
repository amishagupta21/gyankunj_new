import React, { useEffect, useState } from "react";
import { Row, Col, ButtonGroup, Dropdown, Card, Button } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";
import seeAll from "../../../Images/icon_chevron_see_all.svg";
import { viewNotice } from "../../../ApiClient";
import moment from "moment";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const NoticeForTeacher = () => {
  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  const [allNotice, setAllNotice] = useState({});
  const [hideResponse, setHideResponse] = useState([]);
  const [sectionExpanded, setSectionExpanded] = useState(false);

  useEffect(() => {
    allNotices();
  }, []);

  const allNotices = () => {
    const role = "teacher";
    viewNotice(role)
      .then((res) => setAllNotice(res.data))
      .catch((err) => console.log("Notices err - ", err));
  };

  const showResponseHandler = (id) => {
    // allNotices();
    let openHandler = [...hideResponse];
    openHandler.push(id);
    setHideResponse([...openHandler]);
    setSectionExpanded(true);
  };

  const hideResponseHandler = (id) => {
    let openHandler = [...hideResponse];
    let findindex = openHandler.indexOf(id);
    setSectionExpanded(false);

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
        <Col md={2} className="teacherRoutingDD">
          {/* <span>
                  <Dropdown>
                    <Dropdown.Toggle className="dropdownHead" id="dropdown-basic">
                    Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">2 </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">3 </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span> */}
        </Col>
      </Row>
      {/* {allNotice?.status == "failure" ? (<Row style={{height: "93px"}}>
          <Col md={12} style={{paddingTop: "30px"}}>
            <span className='failureMessage'>{allNotice.message}</span>
          </Col>
        </Row>) 
        :
        (
          allNotice?.notices?.map((notice, indx) => {
            console.log("notice - ", notice)
            return <Row style={{height: "93px"}}>
            <Col md={1} style={{paddingTop: "30px"}}>
              <img src={seeAll} alt="seeAll" />
            </Col>
            <Col md={11} className="noticeContent">
              <h6 className="noticeHeader">{notice?.notice_subject}</h6>
              <p className="noticeTime">{moment(notice?.published_at).format("DD-MMM-YYYY")}</p>
            </Col>
          </Row>
          })
        )
        } */}

      {allNotice?.status == "failure" ? (
        <Row style={{ height: "93px" }}>
          <Col md={12} style={{ paddingTop: "30px" }}>
            <span className="failureMessage">{allNotice.message}</span>
          </Col>
        </Row>
      ) : (
        <div>
          {allNotice?.notices?.map((notice, indx) => {
            console.log("notice - ", notice);
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

                    <p className="noticeTime">
                      {moment(notice?.published_at).format("DD-MMM-YYYY")}
                    </p>

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
                  {/* <Row>
                            <Col md={12}>
                              <h6>Description :</h6>
                              <p>{notice?.notice_data}</p>
                            </Col>
                          </Row> */}
                </Row>
              </fieldset>
            );
          })}
        </div>
        //   );
        // })
      )}
    </div>
  );
};

export default NoticeForTeacher;
