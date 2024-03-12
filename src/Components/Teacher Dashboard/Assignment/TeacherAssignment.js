import React, { useEffect, useState } from "react";
import TeacherSidebar from "../TeacherSidebar";
import { Row, Col, Button, Table, Form, Badge, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import { MdPublish } from "react-icons/md";
import { BsFillPeopleFill, BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import SaveAssignment from "./SaveAssignment";
import {
  getGradeDetails,
  fetchAllSubjects,
  assignmentList,
  viewAssignemnt,
  publishAssignmentData,
  getQuestions,
  deleteAssignment,
} from "../../../ApiClient";
import CreateNewAssignment from "./CreateNewAssignment";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomToast from "./Toast";
import "./teacher.css";
import { Modal } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import SubmissionsComponent from "./SubmissionsComponent";

const TeacherAssignment = () => {
  const userDetails = JSON.parse(localStorage.getItem("UserData"));
  const id = userDetails?.user_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState({
    loading: true,
    data: [],
  });
  const [deleteflag, setDeleteflag] = useState(true);
  const [publishflag, setPublishflag] = useState(true);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [fetchsubjectId, setFetchSubjectId] = useState(null);
  const [gradeId, setgradeId] = useState(null);
  const [scetionId, setSectionId] = useState(null);
  const [sortOrder, setSortOrder] = useState({
    column: "assignment_name",
    direction: "asc",
  });

  const handleSort = (column) => {
    setSortOrder((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };
  const sortedAssignments = Array.isArray(filteredAssignments[0])
    ? [...filteredAssignments[0]].sort((a, b) => {
        const isAsc = sortOrder.direction === "asc" ? 1 : -1;
        return a[sortOrder.column].localeCompare(b[sortOrder.column]) * isAsc;
      })
    : [];
  const handleDeleteConfirmation = (id) => {
    setSelectedAssignmentId(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setSelectedAssignmentId(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirm = () => {
    deleteAssign(selectedAssignmentId);
    handleDeleteCancel();
  };

  const [filterOptions, setFilterOptions] = useState({
    subjects: [],
    types: [],
    statuses: [],
    grades: [],
  });

  const [filters, setFilters] = useState({
    subject: "",
    type: "",
    status: "",
    grade: "",
  });
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    message: "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Is_questions = async (id) => {
    const result = await getQuestions(id);
    if (result.data.status === "success") {
      if (result.data.assignment_details[0].assignment_data !== "") {
        return true;
      } else return false;
    } else return false;
  };
  const publishAssignment = async (id) => {
    if ((await Is_questions(id)) === true) {
      const result = await publishAssignmentData(id);

      setData({
        name: "Publish",
        message: "Your operation has success!",
      });
      setShow(true);
      setPublishflag(!publishflag);
    } else {
      setData({
        name: "Publish",
        message: "Sorry,There is no questions in this Assignment",
      });
      setShow(true);
      setPublishflag(!publishflag);
    }
  };
  const deleteAssign = async (id) => {
    const result = await deleteAssignment(id);
    if (result.data.status === "success") {
      setData({
        name: "Delete",
        message: "Your operation has success!",
      });
      setShow(true);
      setDeleteflag(!deleteflag);
    }
  };
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = (await assignmentList(id)).data?.assignments;

        const tempAssignments = res || [];
        let tempArr = tempAssignments;

        if (searchInput) {
          const searchInputLowerCase = searchInput.toLowerCase();
          tempArr = tempAssignments.filter((item) =>
            item.assignment_name.toLowerCase().includes(searchInputLowerCase)
          );
        }

        setAssignments({
          loading: false,
          data: [tempArr],
        });
        setFilteredAssignments([tempArr]);

        let subjects = tempAssignments?.map(({ subject_name }) => subject_name);
        let uniqueSubjects = [...new Set(subjects)];

        let types = tempAssignments?.map(
          ({ assignment_type_name }) => assignment_type_name
        );
        let uniqueTypes = [...new Set(types)];

        let grades = tempAssignments?.map(({ grade }) => grade);
        let uniqueGrades = [...new Set(grades)];

        setFilterOptions({
          subjects: uniqueSubjects,
          types: uniqueTypes,
          statuses: ["published", "draft"],
          grades: uniqueGrades,
        });
      } catch (err) {
        console.log("ERR", err);
      }
    })();
  }, [deleteflag, publishflag, searchInput]);

  useEffect(() => {
    if (assignments.data.length > 0) {
      const tempArr = assignments.data[0].filter((item) => {
        let pass = {
          subject: true,
          type: true,
          status: true,
          grade: true,
        };

        if (filters.subject && item?.subject_name !== filters.subject) {
          pass.subject = false;
        }

        if (filters.type && item?.assignment_type_name !== filters.type) {
          pass.type = false;
        }

        if (filters.grade && item?.grade !== filters.grade) {
          pass.grade = false;
        }

        if (filters.status) {
          if (
            (filters.status === "published" && item?.is_published) ||
            (filters.status === "draft" && !item.is_published)
          ) {
            pass.status = true;
          } else {
            pass.status = false;
          }
        }

        return pass.subject && pass.type && pass.status && pass.grade;
      });

      const Arr = [tempArr];
      setFilteredAssignments(Arr);
    }
  }, [filters]);

  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 10;

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = sortedAssignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState({
    grade: "",
    section: "",
    subject: "",
  });

  const totalPages = Math.ceil(sortedAssignments.length / assignmentsPerPage);
  return (
    <>
      <div className="report-section p-4 shadow" style={{ marginTop: "90px" }}>
        <Row className="mb-4">
          <Col md={9}>
            <h4>Assignment</h4>
          </Col>
          <Col md={3} className="d-flex justify-content-end align-items-center">
            <Button
              variant="outline-primary"
              onClick={() => navigate("/teacherDashboard/createAssignment")}
            >
              + Create New
            </Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            md={3}
            className="d-flex justify-content-start align-items-center"
          >
            <Form.Control
              type="text"
              placeholder="Search Assignment Name"
              value={searchInput}
              onChange={handleSearch}
            />
          </Col>
          <Col md={9} className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <Form.Label
                className="mr-2"
                style={{
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Status:
              </Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                style={{ marginRight: "10px", width: "150px" }}
              >
                <option value="">Select Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </Form.Control>
            </div>
            <div className="d-flex align-items-center ml-4">
              <Form.Label
                className="mr-2"
                style={{
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Type:
              </Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                style={{ width: "150px" }}
              >
                <option value="">Select Type</option>
                {filterOptions.types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </div>
          </Col>
        </Row>

        <Table responsive striped bordered hover className="mb-4 ">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("assignment_name")}
                className="assignment-header"
              >
                Assignment Name{" "}
                {sortOrder.column === "assignment_name" &&
                  sortOrder.direction === "asc" && <FaCheck />}
                {sortOrder.column === "assignment_name" &&
                  sortOrder.direction === "desc" && <FaCheck />}
              </th>
              <th>Grade</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Chapter</th>
              <th>Type</th>
              <th>Duration/mins</th>
              <th>Status</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssignments.map((item) => (
              <tr key={item?.assignment_id}>
                <td>{item?.assignment_name}</td>
                <td>{item?.grade}</td>
                <td>{item?.section_name}</td>
                <td>{item?.subject_name}</td>
                <td>{item?.chapter_number}</td>
                <td>{item?.assignment_type_name}</td>
                <td>{item?.assignment_duration}</td>
                <td>
                  {item?.is_published ? (
                    <Badge bg="primary">Publish</Badge>
                  ) : (
                    <Badge bg="secondary">draft</Badge>
                  )}
                </td>
                <td className="d-flex gap-2">
                  {!item?.is_published && (
                    <>
                      <BiSolidEdit
                        className="cursor-pointer h-6 w-6 text-[#676d71]"
                        title="Edit"
                        onClick={() =>
                          navigate("/teacherDashboard/addquestions", {
                            state: item?.assignment_id,
                          })
                        }
                      />
                      <MdPublish
                        className="cursor-pointer h-6 w-6 text-[#676d71]"
                        title="Publish"
                        onClick={() => publishAssignment(item?.assignment_id)}
                      />
                      <AiFillDelete
                        className="cursor-pointer h-6 w-6 text-[#676d71]"
                        title="Delete"
                        onClick={() =>
                          handleDeleteConfirmation(item?.assignment_id)
                        }
                      />
                    </>
                  )}
                  {item?.is_published && (
                    <>
                      <BsEyeFill
                        className="cursor-pointer h-6 w-6 text-[#676d71]"
                        title="View"
                        onClick={() => {
                          if (item?.assignment_id) {
                            navigate(
                              `/teacherDashboard/submissionsReport/${item?.assignment_id}`,
                              { state: { assignment_id: item?.assignment_id } }
                            );
                          }
                        }}
                      />

                      <BsFillPeopleFill
                        className="cursor-pointer h-6 w-6 text-[#676d71]"
                        title="See Submissions"
                        onClick={() =>
                          navigate(
                            `/teacherDashboard/submissions/${item?.assignment_id}`
                          )
                        }
                      />
                      {/* <BsFillPeopleFill className="cursor-pointer h-6 w-6 text-[#676d71]" title="See Submissions" /> */}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this assignment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <CustomToast show={show} setShow={setShow} data={data} />
    </>
  );
};

export default TeacherAssignment;
