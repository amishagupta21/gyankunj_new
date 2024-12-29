import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import contactUs from "../Images/contact-us.png";

const UserBasicDetailsForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    reset(); // Reset the form fields
  };

  return (
    <>
    <div className="pt-3 img-container">
        <img
          alt="img"
          className="w-100"
          style={{ height: 550 }}
          src={contactUs}
        />
      </div>
      <div className="py-3">
        <p className="display-5">Connect With Us</p>
        <p className="lead">
          Want to know more about how <strong>Gyankoonj</strong> can transform
          your educational experience? Fill out the form below to connect with
          us.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is invalid",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      multiline
                      rows={4}
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ""}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default UserBasicDetailsForm;
