import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { changeUserPassword, fetchSecurityQuestions } from "../ApiClient";
import { showAlertMessage } from "./AlertMessage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePasswordDialog = ({ open, onClose, userId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [securityQuestionsList, setSecurityQuestionsList] = useState([]);

  useEffect(() => {
    fetchSecurityQuestions()
      .then((res) => {
        if (res?.data?.security_question?.length > 0) {
            setSecurityQuestionsList(res.data.security_question);
        }
      })
      .catch(console.error);
  }, []);  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = useCallback(
    (data) => {
      const payload = {
        ...data,
        user_id: userId,
        show_reset_popup: false,
      };

      setLoading(true);
      changeUserPassword(payload)
        .then((res) => {
          const status = res?.data?.status;
          setShowAlert(status === "success" ? "success" : "error");

          if (status === "success") {
            reset();
            onClose();
          }

          setTimeout(() => setShowAlert(""), 2000);
        })
        .catch(() => {
          setShowAlert("error");
          setTimeout(() => setShowAlert(""), 3000);
        })
        .finally(() => setLoading(false));
    },
    [userId, reset, onClose]
  );

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="dense">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={field.value || ""}
                  variant="outlined"
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Security Question</InputLabel>
            <Controller
              name="security_question"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Security Question"
                  error={!!errors.security_question}
                  value={field.value || ""}
                >
                  {securityQuestionsList.map((question, index) => (
                    <MenuItem key={index} value={question}>
                      {question}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <Controller
              name="security_answer"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Security Answer"
                  variant="outlined"
                  value={field.value || ""}
                  error={!!errors.security_answer}
                />
              )}
            />
          </FormControl>

          <DialogActions>
            <Button
              onClick={onClose}
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Change Password"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message:
            showAlert === "success"
              ? "Password changed successfully!"
              : "Failed to change password.",
        })}
    </Dialog>
  );
};

export default ChangePasswordDialog;
