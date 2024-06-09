import React from "react";
import home from "../Images/home.svg";
import about from "../Images/aboutimg.svg";
import detail from "../Images/detail.svg";
import admin from "../Images/admin.jpeg";
import parent from "../Images/parent.jpg";
import teacher from "../Images/forteacher.svg";
import student from "../Images/forstudent.svg";
import Gyankoonj_logo from "../Images/Gyankoonj_logo.png";
import { Button } from "@mui/material";

const LandingDashboard = () => {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-items-center px-3"
        style={{
          background:
            "linear-gradient(95deg, #236eb4 2.39%, #6171bc 32.45%, #e878cf 97.66%)",
        }}
      >
        <div className="text-white" style={{ flex: 1 }}>
          <p className="display-5">
            Upgrade your schools for better Performance
          </p>
          <p className="lead">
            Gyaankoonj is the first ever cloud-based School Management Software
            providing an amazing automated experience to educational
            institutions of all size with its highly scalable, secure and robust
            ERP solutions. Our School ERP Software is designed to simplify all
            your academic and back office chores with unmatched efficiencies and
            empowering you to keep up with the learning demands of the 21st
            century, that too, with the most user-friendly interface.
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="contained"
              onClick={() => (window.location.href = "#check-section")}
            >
              Check Module
            </Button>
            <Button
              variant="contained"
              onClick={() => (window.location.href = "#learn-more-section")}
            >
              Learn more
            </Button>
          </div>
        </div>
        <div>
          <img alt="img" className="w-100" style={{ height: 500 }} src={home} />
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-between align-items-center px-3"
        style={{
          background: "#f4f4f4",
        }}
      >
        <div>
          <img
            alt="img"
            className="w-100"
            style={{ height: 500 }}
            src={about}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p className="display-5">Learn new concepts for each question</p>
          <p className="lead">
            If you are looking for a Tailor-Fit Cloud ERP Software for your
            School/College with Better Administration, Better Reports & Better
            Communication. Then the answer is Gyankunj.
          </p>
          <p className="lead">A Single Tool to Manage Entire Institute</p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center px-3">
        <div style={{ flex: 1 }}>
          <p className="display-5">Tools For Teachers And Learners</p>
          <p className="lead">
            Class has a dynamic set of teaching tools built to be deployed and
            used during class. Teachers can handout assignments in real-time for
            students to complete and submit. Discussion forums for ongoing
            conversations, allowing students to ask questions, share resources,
            and collaborate beyond class hours. Automatic attendance tracking
            based on student logins or participation in class activities.
          </p>
        </div>
        <div>
          <img
            alt="img"
            className="w-100"
            style={{ height: 500 }}
            src={detail}
          />
        </div>
      </div>
      <div
        className="p-3 text-center" id="check-section"
        style={{
          background:
            "linear-gradient(95deg, #e878cf 2.39%, #6171bc 32.45%, #236eb4 97.66%)",
        }}
      >
        <p className="display-5 text-white">All-In-One Cloud Software.</p>
        <p className="lead text-white">
          Gyankunj is one powerful online software suite that combines all the
          tools needed to run a successful school or office. Personalized
          learning materials tailored to individual student needs. Integration
          with educational content platforms to provide additional resources and
          practice materials.
        </p>
        <div class="row justify-content-center">
          <div class="d-flex flex-sm-wrap justify-content-around w-75">
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">Tracking & Reporting</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts.
              </span>
            </div>
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">
                Any Academy or System
              </span>
              <span>
                Schedule and reserve classrooms at one campus or multiple
                campuses. Keep detailed records of student attendance.
              </span>
            </div>
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">Student Tracking</span>
              <span>
                Automate and track emails to individuals or groups. Skilline’s
                built-in system helps organize your organization.
              </span>
            </div>
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">End to End solution</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts.
              </span>
            </div>
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">Secure & Relatable</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts.
              </span>
            </div>
            <div class="card m-4 p-3 shadow-sm text-left" style={{width: 300, height: 300}}>
              <span class="h4 font-weight-bold mb-2 text-primary-emphasis">Well informed</span>
              <span>
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-3 text-center" id="learn-more-section"
      >
        <p className="display-5">Features of Gyankoonj</p>
        <p className="lead">
          Gyankoonj is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </p>
        <div className="images">
          <div className="image-container mb-4">
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
                  platform.
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
              <p>FOR PARENTS</p>
              <ul className="bullet-list">
                <li>
                  Access to your child's assignments, grades, and progress in
                  one place.
                </li>
                <li>
                  Direct communication with teachers promotes teamwork for your
                  child's success.
                </li>
                <li>
                  Help your child manage their responsibilities with ease and
                  guidance.
                </li>
                <li>
                  Tailored learning paths to suit your child's needs and style.
                </li>
              </ul>
            </div>
          </div>

          <div className="image-container">
            <img src={admin} className="w-100" alt="student" />
            <div className="hover-content">
              <p>FOR ADMINISTRATION</p>
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
          .images {
            display: flex;
            justify-content: center;
            gap: 20px;
          }

          .image-container {
            position: relative;
          }

          .image-container img {
            width: 100%;
            height: 300px;
            border-radius: 10px;
          }

          .hover-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            display: none;
            text-align: left;
          }

          .image-container:hover .hover-content {
            display: block;
          }

          .footer {
            padding: 50px 20px;
            background: #1f5ba1;
            color: white;
            text-align: center;
          }

          .footer1,
          .footer2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
          }

          .footer1 img {
            width: 150px;
            margin-bottom: 10px;
          }

          .footer1 .border {
            width: 50px;
            height: 2px;
            background: white;
            margin-bottom: 10px;
          }

          .resources {
            display: flex;
            gap: 10px;
            margin-top: 20px;
          }

          .resources input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
          }

          .resources button {
            padding: 10px 20px;
            border: none;
            background: #164d82;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 5px;
          }

          .resources button:hover {
            background: #123a6a;
          }
        `}
      </style>
    </>
  );
};

export default LandingDashboard;
