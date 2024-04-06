import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertMessage = ({
  open,
  alertFor,
  message,
  vertical = "top",
  horizontal = "center",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
      <Alert severity={alertFor} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}; 

export const showAlertMessage = ({ open, alertFor, message }) => {
  return <AlertMessage open={open} alertFor={alertFor} message={message} />;
};

export default AlertMessage;
