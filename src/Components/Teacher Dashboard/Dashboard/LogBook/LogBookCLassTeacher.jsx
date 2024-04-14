import React, { useState, useMemo, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  getGradeDetails,
  verifyLogBook,
  viewLogBook,
} from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import AddNewLog from "./AddNewLog";

const LogBookCLassTeacher = () => {
  const [logBookDetails, setLogBookDetails] = useState();
  const [gradeData, setGradeData] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(dayjs());
  const [isAddLogModalVisible, setIsAddLogModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedLogBook, setSelectedLogBook] = useState({});
  const userId = JSON.parse(localStorage.getItem("UserData"))?.user_id;
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const date = dateFilter.format("YYYY-MM-DD");
    if (gradeFilter && sectionFilter && dateFilter) {
      setSelectedLogBook({});
      setIsLoading(true);
      viewLogBook(date, gradeFilter, sectionFilter)
        .then((res) => {
          setLogBookDetails(res?.data?.log_book_data || []);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [gradeFilter, sectionFilter, dateFilter, refreshTable]);

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
    setSectionFilter("");
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateFilter(newValue);
  };

  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="grade-filter-label">Grade</InputLabel>
          <Select
            labelId="grade-filter-label"
            value={gradeFilter || ""}
            onChange={handleGradeChange}
          >
            {gradeData.map((item) => (
              <MenuItem key={item.grade_id} value={item.grade_id}>
                {item.grade_id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <InputLabel id="section-filter-label">Section</InputLabel>
          <Select
            labelId="section-filter-label"
            value={sectionFilter}
            onChange={handleSectionChange}
            disabled={!gradeFilter}
          >
            {gradeData
              .find((grade) => grade.grade_id === gradeFilter)
              ?.section_list.map((section) => (
                <MenuItem key={section.section_id} value={section.section_id}>
                  {section.section_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: "calc(100%/3)" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              value={dateFilter}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    );
  };

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const approveLogBook = useCallback(
    (isVerified, comment, rowData) => {
      const dataToVerify = {
        log_book_id: rowData.log_book_id,
        user_type: "primary",
        user_id: userId,
        verification_status: isVerified,
        message: !isVerified ? comment : undefined,
      };

      verifyLogBook(dataToVerify)
        .then((res) => {
          console.log("Verified - ", res.data);
          if (res.data.status) {
            setRefreshTable(!refreshTable);
          }
        })
        .catch((err) => console.log("Not Verified"));
    },
    [userId, refreshTable]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "period",
        header: "Period",
      },
      {
        accessorKey: "students_present",
        header: "Student Present",
      },
      {
        accessorKey: "subject_name",
        header: "Subject",
      },
      {
        accessorKey: "content_taught",
        header: "Content Taught",
      },
      {
        accessorKey: "home_work",
        header: "Homework",
      },
      {
        accessorKey: "primary_verification_status",
        header: "Status",
        size: 200,
        accessorFn: (row) => (
          <>
            {row.primary_verification_status === true ? (
              <div className="fw-bold text-success">Verified</div>
            ) : row.primary_verification_status === false ? (
              <div className="fw-bold text-danger">Sent back</div>
            ) : (
              <div>
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  className="me-2"
                  onClick={() => {
                    approveLogBook(true, "", row);
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setSelectedLogBook(row);
                    handleClickOpen();
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
          </>
        ),
      },
    ],
    [approveLogBook, setSelectedLogBook, handleClickOpen]
  );

  return (
    <div>
      <RenderTopToolbarCustomActions />
      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={logBookDetails?.log_record || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Log book</h1>
        )}
      />
      <ClassTeacher teacher={logBookDetails?.class_teacher_name} />
      <AbsenteesList absentees={logBookDetails?.name_of_absentees} />
      <DefaultersList defaulters={logBookDetails?.name_of_dress_defaulters} />
      <AddNewLog
        isOpen={isAddLogModalVisible}
        handleClose={() => setIsAddLogModalVisible(false)}
        gradeList={gradeData}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const comment = formJson.comment;
            approveLogBook(false, comment, selectedLogBook);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reject this log book, please enter your comment here. We will
            send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            rows={3}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogBookCLassTeacher;

const ClassTeacher = ({ teacher }) => (
  <h1 className="fs-6 mt-2">
    Name of Class Teacher: <span className="fw-light">{teacher}</span>
  </h1>
);

const AbsenteesList = ({ absentees }) => (
  <h1 className="fs-6 mt-2">
    Name of Absentees:{" "}
    {absentees?.map((item, index) => (
      <span key={index} className="fw-light">
        {item.student_name}
        {item.student_name && index + 1 < absentees.length && ", "}
      </span>
    ))}
  </h1>
);

const DefaultersList = ({ defaulters }) => (
  <h1 className="fs-6 mt-2">
    Name of Defaulters:{" "}
    {defaulters?.map((item, index) => (
      <span key={index} className="fw-light">
        {item.student_name}
        {item.student_name && index + 1 < defaulters.length && ", "}
      </span>
    ))}
  </h1>
);
