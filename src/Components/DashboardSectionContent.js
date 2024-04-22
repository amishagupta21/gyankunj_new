import React from "react";
import home from "../Images/home.svg";
import about from "../Images/aboutimg.svg";
import detail from "../Images/detail.svg";
import admin from "../Images/admin.jpeg";
import parent from "../Images/parent.jpg";
import teacher from "../Images/forteacher.svg";
import student from "../Images/forstudent.svg";
import Gyankoonj_logo from "../Images/Gyankoonj_logo.png";

const homesection = () => {
  return (
    <>
      <div className="homecontainer">
        <div className="heading">
          <p>Upgrade your SCHOOLS for better Performance</p>
          <p>
            Gyaankoonj is the first ever cloud-based School Management Software
            providing an amazing automated experience to educational
            institutions of all size with its highly scalable, secure and robust
            ERP solutions. Our School ERP Software is designed to simplify all
            your academic and back office chores with unmatched efficiencies and
            empowering you to keep up with the learning demands of the 21st
            century, that too, with the most user-friendly interface.
          </p>
          <div className="learnmorebutton">
            <button onClick={() => (window.location.href = "#check-section")}>
              Check Module
            </button>
            <button
              onClick={() => (window.location.href = "#learn-more-section")}
            >
              Learn more
            </button>
          </div>
        </div>
        <div>
          <img className="w-100" src={home} />
        </div>
      </div>
      <div className="aboutContainer">
        <div>
          <img className="w-100" src={about} />
        </div>
        <div className="teacherInfo">
          <h2>Learn new concepts for each question</h2>
          <p>
            If you are looking for a Tailor-Fit Cloud ERP Software for your
            School/College with Better Administration, Better Reports & Better
            Communication. Then the answer is Gyankunj.
          </p>
          <h1>A Single Tool to Manage Entire Institute</h1>
        </div>
      </div>

      <div className="detailSection">
        <div className="teacherstudentInfo">
          <p>Tools For Teachers And Learners</p>
          <span>
            Class has a dynamic set of teaching tools built to be deployed and
            used during class. Teachers can handout assignments in real-time for
            students to complete and submit. Discussion forums for ongoing
            conversations, allowing students to ask questions, share resources,
            and collaborate beyond class hours. Automatic attendance tracking
            based on student logins or participation in class activities.
          </span>
        </div>
        <div>
          <img src={detail} />
        </div>
      </div>

      <div className="allinone" id="check-section">
        <p>All-In-One Cloud Software.</p>
        <p>
          Gyankunj is one powerful online software suite that combines all the
          tools needed to run a successful school or office. Personalized
          learning materials tailored to individual student needs.Integration
          with educational content platforms to provide additional resources and
          practice materials.
        </p>
        <div className="cards">
          <div className="featurscount">
            <div className="card">
              <span>Tracking & Reporting</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts
              </span>
            </div>
            <div className="card">
              <span>Any Academy or System</span>
              <span>
                Schedule and reserve classrooms at one campus or multiple
                campuses. Keep detailed records of student attendance
              </span>
            </div>
            <div className="card">
              <span>Student Tracking</span>
              <span>
                Automate and track emails to individuals or groups. Skilline’s
                built-in system helps organize your organization{" "}
              </span>
            </div>
          </div>
          <div className="featurscount">
            <div className="card">
              <span>End to End solution</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts
              </span>
            </div>
            <div className="card">
              <span>Secure & Relatable</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts
              </span>
            </div>
            <div className="card">
              <span>Well informed</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="forteacherandstudent" id="learn-more-section">
        <p>Featurs of Gyankoonj</p>
        <p>
          Gyankoonj is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </p>
        <div className="images">
          <div className="image-container">
            <img src={teacher} alt="teacher" className="teacher-image w-100" />
            <div className="hover-content">
              <p>FOR INSTRUCTORS</p>
              <ul className="bullet-list">
                <li>Attendance Mark-up of Students.</li>
                <li>Assign ClassWork, HomeWork, Timed Test And Quizzes.</li>
                <li>Auto Submission Of timed Exams and Tests.</li>
                <li>Manual & Auto Correction Of Answer Scripts.</li>
                <li>Canvas Feature.</li>
              </ul>
            </div>
          </div>

          <div className="image-container">
            <img src={student} alt="student" className="w-100" />

            <div className="hover-content">
              <p>FOR STUDENTS</p>
              <ul className="bullet-list">
                <li>Remote Access From anywhere.</li>
                <li>
                  Take up/ Submit Homework/ Classwork/ Test and Quizzes on this
                  platform.{" "}
                </li>
                <li>Access to Unlimited E-Books and Course material.</li>
                <li>Make Digital notes. Listen and Learn.</li>
                <li>Performance Feedback.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="images">
          <div className="image-container">
            <img
              src={parent}
              height="400px"
              width="600px"
              alt="teacher"
              className="teacher-image"
            />
            <div className="hover-content">
              <p>FOR Parents</p>
              <ul className="bullet-list">
                <li>
                  Access to your child's assignments, grades, <br />
                  and progress in one place.
                </li>
                <li>
                  Direct communication with teachers promotes teamwork <br />
                  for your child's success.
                </li>
                <li>
                  Help your child manage their responsibilities <br />
                  with ease and guidance.
                </li>
                <li>
                  Tailored learning paths to suit your <br />
                  child's needs and style.
                </li>
              </ul>
            </div>
          </div>

          <div className="image-container">
            <img src={admin} className="w-100" alt="student" />

            <div className="hover-content">
              <p>FOR Adminstraton</p>
              <ul className="bullet-list">
                <li>User Validation & Authentication.</li>
                <li>Activity Monitoring For Staff and Student.</li>
                <li>Performance Report Of Staff & Student.</li>
                <li>Assignment Allocation for Staff & Student.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer1">
          <img src={Gyankoonj_logo} alt="Logo" />
          <div className="border"></div>
          <p>Virtual Class for Students</p>
        </div>
        <div className="footer2">
          <p>Subscribe to get our Newsletter</p>
          <div className="resources">
            <input placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>

        <p>© 2023 Gyankoonj. </p>
      </div>
      <style jsx="true">
        {`
                      
            .dashboardContentMain section{
                text-align: left;
                font: normal normal normal 20px/30px Roboto;
                letter-spacing: 0px;
                color: #0D205B;
                opacity: 1;
            }
            
            .dashboardContentMain h1 {
            font: normal normal medium 50px/24px Roboto;
            letter-spacing: 0px;
            color: #0B1785;
            opacity: 1;
            }
            
            .sectionMid {
                padding: 30px 200px;
            }
            
            .sectionEnd{
            font: normal normal medium 18px/30px Roboto;
            letter-spacing: 0px;
            color: #4D4C4C;
            opacity: 1;
            }
            
            .dashboardContentMid{
                height: 776px;
                width: 100%;
                padding: 0px 153px
            }
            
            .dashboardImageContent{
                height:320px;
                width: 561px;
                margin-top: 50px;
            }
            
            .dashboardImageContent h4{
                width: 116px;
                text-align: center;
            font: normal normal bold 30px/24px Roboto;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
            padding-top: 44px;
                padding-left: 31px;
            }
            
            .dashboardImageContent p{
                width: 298px;
            height: 96px;
            text-align: left;
            font: normal normal normal 18px/24px Roboto;
            letter-spacing: 0px;
            color: #03072A;
            opacity: 1;
            padding-left: 31px;
            }
            
            .whyToChoose{
                width: 100%;
                height: 951px;
                padding-top: 50px;
            }
            
            .whyToChooseImg{
                width: 152px;
                height: 152px;
                position: relative;
                left: 65px;
            }
            
            .whyToChoose p {
                text-align: center;
            font: normal normal normal 22px/64px Roboto;
            letter-spacing: 0px;
            color: #040404;
            opacity: 1;
            }
            
            .whyToChooseInnerContent{
                width: 100%;
                padding: 50px 12px 0px 282px;
            }
            
            .dashboardEndContent{
                height: 594px;
                width: 100%;
                border: 1px solid;
                padding-top: 50px;
            }
            
            .dashboardEndContent h1{
                text-align: center;
            font: normal normal bold 50px/24px Roboto;
            letter-spacing: 0px;
            color: #FFFFFF;
            opacity: 1;
            }
            
            .EndContentInner{
                padding: 80px 100px;
            }
            
            .EndContentInner p{
                margin-top: 40px;
                text-align: center;
            font: normal normal normal 35px/6px Roboto;
            letter-spacing: 0px;
            color: #FFFFFF;
            opacity: 1;
            } */

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .bullet-list {
            list-style-type: disc;
            text-align: right;
          }

          .bullet-list li {
            text-align: left;
          }

          .homecontainer {
            width: 100%;
            padding: 0 20px;
            background: linear-gradient(
              95deg,
              #236eb4 2.39%,
              #6171bc 32.45%,
              #e878cf 97.66%
            );
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .heading p {
            width: 600px;
            color: #fff;
            font-family: Poppins;
            font-size: 50px;
            font-style: normal;
            font-weight: 700;
            margin: 0;
          }

          .heading p:nth-child(2) {
            width: 600px;
            color: #fff;
            font-family: Poppins;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-align: left;
            margin-left: 30px;
            margin-top: 20px;
          }

          .learnmorebutton {
            display: flex;
            gap: 20px;
            margin-left: 30px;
            margin-top: 20px;
          }

          .learnmorebutton button:nth-child(1) {
            width: 201.494px;
            height: 51.545px;
            flex-shrink: 0;
            border-radius: 14.058px;
            background: #ff00c7;
            color: #fff;
            font-family: Poppins;
            font-size: 18.744px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }

          .learnmorebutton button:nth-child(2) {
            width: 166.349px;
            height: 51.545px;
            flex-shrink: 0;
            border-radius: 14.058px;
            border: 1.171px solid #fff;
            color: black;
            font-family: Poppins;
            font-size: 18.744px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }

          .aboutContainer {
            padding: 0 20px;
            background: linear-gradient(
              95deg,
              #e878cf 2.39%,
              #6171bc 32.45%,
              #236eb4 97.66%
            );

            display: flex;
            justify-content: space-between;
            gap: 50px;
          }

          .aboutContainer img {
            margin-top: 100px;
          }

          .teacherInfo {
            margin-left: 50px;
            margin-right: 50px;
          }

          .teacherInfo h2 {
            color: #000;
            font-family: Aeonik;
            font-size: 54.277px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.283px;
            margin-top: 180px;
          }

          .teacherInfo p {
            color: #fff;
            font-family: Aeonik;
            font-size: 22.681px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.239px;
            margin-top: 30px;
          }

          .teacherInfo h1 {
            color: #000;
            font-family: Aeonik;
            font-size: 44.277px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.283px;
          }

          .detailSection {
            padding: 0 20px;
            background: linear-gradient(
              95deg,
              #236eb4 2.39%,
              #6171bc 32.45%,
              #e878cf 97.66%
            );
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
          }

          .teacherstudentInfo p {
            padding: 0 20px;
            color: black;
            font-family: Poppins;
            font-size: 40px;
            font-style: normal;
            font-weight: 600;
            /* line-height: 160%; */
          }

          .teacherstudentInfo span {
            color: #ededf1;
            font-family: Poppins;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 180%;
            letter-spacing: 0.44px;
            /* text-align: left; */
            margin: 0;
          }

          .allinone {
            background: linear-gradient(
              95deg,
              #e878cf 2.39%,
              #6171bc 32.45%,
              #236eb4 97.66%
            );
          }

          .allinone p {
            color: #eef1f1;
            font-family: Poppins;
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: 180%;
            /* 64.8px */
            text-align: center;
          }

          .allinone p:nth-child(2) {
            width: 80%;
            color: white;
            /* text-align: center; */
            font-family: Poppins;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 180%;
            /* 43.2px */
            /* margin: 50px; */
            margin-left: 150px;
          }

          .cards {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            /* width:100%; */
            /* height: 350px; */
            flex-shrink: 0;
            box-shadow: 0px 10px 60px 0px rgba(38, 45, 118, 0.08);
          }

          .featurscount {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60%;
            gap: 30px;
            margin-bottom: 20px;
            /* height: 200px; */
          }

          .card {
            width: 300px;
            height: 300px;
            flex-shrink: 0;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0px 10px 60px 0px rgba(38, 45, 118, 0.08);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .card span:nth-child(1) {
            width: 270px;
            color: #2f327d;
            text-align: center;
            font-family: Poppins;
            font-size: 30px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-bottom: 10px;
          }

          .card span:nth-child(2) {
            color: #696984;
            text-align: center;
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 180%;
            /* 36px */
            width: 250px;
          }

          .forteacherandstudent {
            padding: 0 20px;
            height: auto;
            background: linear-gradient(
              95deg,
              #e878cf 2.39%,
              #6171bc 32.45%,
              #236eb4 97.66%
            );
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .forteacherandstudent p:nth-child(1) {
            color: #2f327d;
            text-align: center;
            font-family: Poppins;
            font-size: 44px;
            font-style: normal;
            font-weight: 600;
            line-height: 180%;
            /* 79.2px */
            margin-top: 10px;
          }

          .forteacherandstudent p:nth-child(2) {
            color: #d4d4eb;
            /* text-align: center; */
            font-family: Poppins;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 180%;
            /* 43.2px */
            letter-spacing: 0.48px;
            width: 700px;
          }

          .images {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
          }

          .image-container {
            position: relative;
          }

          .teacher-image {
            /* height: 350px; */
            cursor: pointer;
          }

          .hover-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s;
          }

          .image-container:hover .hover-content {
            opacity: 1;
          }

          .image-container img {
            border-radius: 10px;
          }
          .footer {
            height: 300px;
            background: #252641;
          }

          .footer1 {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            padding-top: 10px;
          }

          .footer1 p {
            color: #fff;
            font-family: Poppins;
            font-size: 22px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 0.88px;
            margin-top: 15px;
          }

          .footer1 img {
            height: 50px;
            width: 100px;
          }

          .border {
            width: 1px;
            height: 83px;
            background: #626381;
          }

          .footer2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .footer2 p {
            color: #b2b3cf;
            text-align: center;
            font-family: Poppins;
            font-size: 26px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 1.04px;
            margin-top: 20px;
          }

          .resources {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }

          .resources input {
            width: 300px;
            height: 60px;
            flex-shrink: 0;
            border-radius: 80px;
            border: 1px solid #83839a;
            color: #83839a;
            text-align: center;
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.8px;
          }

          .resources button {
            width: 179px;
            height: 60px;
            flex-shrink: 0;
            border-radius: 60px;
            background: #49bbbd;
            color: #fff;
            font-family: Poppins;
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }

          .footer p {
            color: #b2b3cf;
            text-align: center;
            font-family: Poppins;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.88px;
            margin-top: 40px;
          }
        `}
      </style>
    </>
  );
};

export default homesection;
