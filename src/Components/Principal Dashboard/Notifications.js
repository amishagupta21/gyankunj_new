import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { viewNotification } from "../../ApiClient";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Select from "react-select";

const NotificationsForTeacher = () => {
  const userDetails = JSON.parse(localStorage.getItem("UserData"));

  const [notificationData, setNotificationData] = useState({});
  const [hideResponse, setHideResponse] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    allNotification();
  }, [selectedRole]);

  const roleOptions = [
    { value: "principal", label: "Self" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
  ];

  const allNotification = () => {
    viewNotification(userDetails?.user_id, userDetails?.role)
      .then((res) => setNotificationData(res.data))
      .catch((err) => console.log("Notices err - ", err));
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

  const handleRoleChange = (e) => {
    setSelectedRole(e.value);
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
        <Col md={9}>
          <h4>Notification</h4>
        </Col>
        <Col md={3} className="teacherRoutingDD">
          <Select
            placeholder="Select Role"
            options={roleOptions}
            onChange={(e) => handleRoleChange(e)}
            isSearchable={false}
          />
        </Col>
      </Row>

      {
        <div>
          {notificationData?.notifications?.map((notification, indx) => {
            console.log("notification - ", notification);
            return (
              <fieldset>
                <Row className="lessonData">
                  <Col md={1} style={{ textAlign: "left" }}>
                    {hideResponse?.includes(notification?.notification_id) ? (
                      <FaAngleUp
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "blue",
                        }}
                        onClick={() =>
                          hideResponseHandler(notification?.notification_id)
                        }
                      />
                    ) : (
                      <FaAngleDown
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "blue",
                        }}
                        onClick={() =>
                          showResponseHandler(notification?.notification_id)
                        }
                      />
                    )}
                  </Col>

                  <Col
                    md={11}
                    className={
                      !hideResponse.includes(notification?.notification_id)
                        ? "noticeStyle"
                        : "noticeStyleExpanded"
                    }
                  >
                    {
                      <h6 className="noticeHeader">
                        {notification?.operation}
                      </h6>
                    }

                    {hideResponse.includes(notification?.notification_id) && (
                      <Row>
                        <Col md={12}>
                          <h6 className="descriptionHeader">Description :</h6>
                          <p className="descriptionData">
                            {notification?.notification_info}
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
      }
    </div>
  );
};

export default NotificationsForTeacher;
