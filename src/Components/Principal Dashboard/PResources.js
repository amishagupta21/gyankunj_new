import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

import {
  getGradeDetails,
  getResources,
  getSubjectsList,
} from "../../ApiClient";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import bookCover from "../../Images/book-cover-placeholder.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "calc(100% - 53px)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  // Adjust the maxWidth property to increase the width of the dialog
  "& .MuiDialog-paper": {
    maxWidth: "90%", // Adjust the value as needed
    width: "75%", // Adjust the value as needed
    height: "100%",
    overflow: "hidden",
  },
}));

const PResources = () => {
  const [gradeData, setGradeData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedResource, setSelectedResource] = useState({});
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getGradesList();
    getAllSubjectsData();
  }, []);

  const getGradesList = () => {
    getGradeDetails()
      .then((res) => {
        if (res?.data?.grade_details?.grade_details) {
          setGradeData(res.data.grade_details.grade_details);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllSubjectsData = () => {
    getSubjectsList()
      .then((res) => {
        setSubjectsList([]);
        if (res.data && res.data.subjects && res.data.subjects.length > 0) {
          setSubjectsList(res.data.subjects);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (gradeFilter && sectionFilter && subjectFilter) {
      setIsLoading(true);
      setResourcesData([]);
      getResources(gradeFilter, sectionFilter, subjectFilter)
        .then((res) => {
          setResourcesData(res?.data?.content_data || []);
          setTimeout(() => {
           setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [gradeFilter, sectionFilter, subjectFilter]);

  const handleGradeChange = (event) => {
    setGradeFilter(event.target.value);
    setSectionFilter("");
  };

  const handleSectionChange = (event) => {
    setSectionFilter(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubjectFilter(event.target.value);
  };

  const handeCardSelection = (item) => {
    setSelectedResource(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FiltersView = () => {
    return (
      <>
        <h4 className="mb-3">Resources</h4>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
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
                  {item.grade}
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
            <InputLabel id="subject-filter-label">Subject</InputLabel>
            <Select
              labelId="subject-filter-label"
              value={subjectFilter}
              onChange={handleSubjectChange}
            >
              {subjectsList?.map((item) => (
                <MenuItem key={item.subject_id} value={item.subject_id}>
                  {item.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };

  const CardList = () => {
    return (
      <div className="mt-5" style={{ display: "flex", flexWrap: "wrap" }}>
        {isLoading ? (
          <div className="text-center w-100 mt-5"><CircularProgress color="primary" /></div>
        ) : resourcesData?.length > 0 ? (
          resourcesData.map((card) => (
            <Card
              key={card.id}
              sx={{ minWidth: 120, margin: "10px" }}
              onClick={() => handeCardSelection(card)}
            >
              <CardMedia
                component="img"
                alt={card.name}
                height="100"
                sx={{ padding: "10px", width: "100%" }}
                image={card.image ?? bookCover}
              />
              <CardContent className="text-center">
                <Typography className="fw-bold">{card.name}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="w-100 text-center text-danger">No data available</div>
        )}

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          //  scroll="paper"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Book View
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => handleClose(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <object
              type="application/pdf"
              data={`data:application/pdf;base64,${selectedResource?.data}`}
              className="w-100 h-100 border-0"
            >
              PDF file
            </object>
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  };

  return (
    <>
      <FiltersView />
      <CardList />
    </>
  );
};

export default PResources;
