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

const SResources = () => {
  const userInfo = JSON.parse(localStorage.getItem("UserData"));
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedResource, setSelectedResource] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    if (userInfo.grade_id && userInfo.section_id) {
      setIsLoading(true);
      setResourcesData([]);
      getResources(userInfo.grade_id, userInfo.section_id)
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
  }, []);

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

export default SResources;
