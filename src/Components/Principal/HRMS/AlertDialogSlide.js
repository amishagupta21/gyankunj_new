import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ isOpen, title, content, onAgree, onDisagree }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onDisagree}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>Disagree</Button>
        <Button onClick={onAgree}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogSlide;
