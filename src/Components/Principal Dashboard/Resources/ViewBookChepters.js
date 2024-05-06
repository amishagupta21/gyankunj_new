import React, { useState, useEffect, forwardRef, useMemo } from "react";
import {
  AppBar,
  Box,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { getChapterDetails } from "../../../ApiClient";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewBookChapters({
  isOpen,
  handleClose,
  selectedData,
}) {
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterFileInfo, setChapterFileInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedChapter) {
      setIsLoading(true);
      getChapterDetails(selectedChapter)
        .then((res) => {
          if (res?.data?.chapter_data && res?.data?.chapter_data.length > 0) {
            setChapterFileInfo(res?.data?.chapter_data[0]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [selectedChapter]);

  const handleListItemClick = (id) => {
    setSelectedChapter(id);
  };

  const memoizedListItems = useMemo(() => {
    if (!selectedData?.chapter_list) return null;
    return selectedData.chapter_list.map((item) => (
      <ListItemButton
        key={item.chapter_id}
        selected={selectedChapter === item.chapter_id}
        onClick={() => handleListItemClick(item.chapter_id)}
      >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={item.chapter_name} />
      </ListItemButton>
    ));
  }, [selectedData?.chapter_list, selectedChapter]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Book View
          </Typography>
        </Toolbar>
      </AppBar>
      {selectedData?.chapter_list?.length > 0 ? (
        <Grid container spacing={2} className="m-0">
          <Grid item xs={3}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <List component="nav" aria-label="main mailbox folders">
                {memoizedListItems}
              </List>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8}>
            {isLoading ? (
              <div className="text-center w-100 mt-5">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <object
                type="application/pdf"
                data={`data:application/pdf;base64,${chapterFileInfo?.data}`}
                className="w-100 h-100 border-0"
              >
                PDF file
              </object>
            )}
          </Grid>
        </Grid>
      ) : (
        <div className="w-100 text-center text-danger mt-5">
          No data available
        </div>
      )}
    </Dialog>
  );
}
