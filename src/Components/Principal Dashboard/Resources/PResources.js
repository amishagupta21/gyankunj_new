import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  getGradeDetails,
  getResources,
  getSubjectsList,
} from "../../../ApiClient";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import bookCover from "../../../Images/book-cover-placeholder.png";
import ViewBookChepters from "./ViewBookChepters";

const PResources = () => {
  const [gradeData, setGradeData] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedResource, setSelectedResource] = useState({});
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
          setResourcesData(res?.data?.book_data || []);
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
    if(item.chapter_list && item.chapter_list.length > 0){
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
          <div className="text-center w-100 mt-5">
            <CircularProgress color="primary" />
          </div>
        ) : resourcesData?.length > 0 ? (
          resourcesData.map((card) => (
            <Card
              key={card.book_id}
              sx={{
                minWidth: 120,
                margin: "10px",
                cursor: "pointer",
                transition: "box-shadow 0.3s",
                boxShadow: isHovered
                  ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handeCardSelection(card)}
            >
              <CardMedia
                component="img"
                alt={card.book_name}
                height="100"
                sx={{ padding: "10px", width: "100%" }}
                image={card.book_cover_image_content ?? bookCover}
              />
              <CardContent className="text-center">
                <Typography className="fw-bold">{card.book_name}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="w-100 text-center text-danger">No data available</div>
        )}
      </div>
    );
  };

  return (
    <>
      <FiltersView />
      <CardList />
      {open && (
        <ViewBookChepters
          isOpen={open}
          handleClose={handleClose}
          selectedData={selectedResource}
        />
      )}
    </>
  );
};

export default PResources;
