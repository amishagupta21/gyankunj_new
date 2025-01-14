import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MakePaymentDialog = ({ openModal, handleCloseModal, feeDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentAmount: "",
      transactionId: "",
      paymentModeId: "",
      transactionAmount: "",
      feeAmount: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handleCloseModal();
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          maxWidth: isMobile ? "90%" : "60%",
          margin: "auto",
        },
      }}
    >
      <DialogTitle>
        Make Payment
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Student ID"
                value={feeDetails?.student_id || ""}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="paymentAmount"
                control={control}
                rules={{ required: "Payment Amount is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Payment Amount"
                    type="number"
                    fullWidth
                    error={!!errors.paymentAmount}
                    helperText={errors.paymentAmount?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="transactionId"
                control={control}
                rules={{ required: "Transaction ID is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Transaction ID"
                    type="number"
                    fullWidth
                    error={!!errors.transactionId}
                    helperText={errors.transactionId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="paymentModeId"
                control={control}
                rules={{ required: "Payment Mode ID is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Payment Mode ID"
                    type="number"
                    fullWidth
                    error={!!errors.paymentModeId}
                    helperText={errors.paymentModeId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="transactionAmount"
                control={control}
                rules={{ required: "Transaction Amount is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Transaction Amount"
                    type="number"
                    fullWidth
                    error={!!errors.transactionAmount}
                    helperText={errors.transactionAmount?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="feeAmount"
                control={control}
                rules={{ required: "Fee Amount is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fee Amount"
                    type="number"
                    fullWidth
                    error={!!errors.feeAmount}
                    helperText={errors.feeAmount?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => reset()} color="secondary" variant="outlined">
            Reset
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MakePaymentDialog;
