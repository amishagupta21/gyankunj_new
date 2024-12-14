import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getAllMappingsMetadata, updateMapping } from "../../../../ApiClient";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "calc(100% - 53px)",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "90%",
    width: "75%",
    height: "100%",
    overflow: "hidden",
  },
}));

const CreateMapping = ({ isOpen, handleClose, initialData = null }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicle_id: "",
      route_id: "",
      staff_ids: "",
      trip_type_id: "",
      travel_date: "",
    },
  });

  const [showAlert, setShowAlert] = useState();
  const [vehiclesData, setVehiclesData] = useState([]);
  const [routesData, setRoutesData] = useState([]);
  const [tripTypesData, setTripTypesData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    getAllMappingsMetadata()
      .then((res) => {
        setVehiclesData([]);
        setRoutesData([]);
        setTripTypesData([]);
        setStaffData([]);
        if (res?.data?.vehicles_data?.length > 0) {
          setVehiclesData(res.data.vehicles_data);
        }
        if (res?.data?.routes_data?.length > 0) {
          setRoutesData(res.data.routes_data);
        }
        if (res?.data?.trip_types_data?.length > 0) {
          setTripTypesData(res.data.trip_types_data);
        }
        if (res?.data?.staffs_data?.length > 0) {
          setStaffData(res.data.staffs_data);
        }
        setTimeout(() => {
          if (initialData) {
            reset(initialData);
          }
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      if (initialData) {
        reset(initialData);
      }
    }, 100);
  }, [initialData, reset]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);

    updateMapping([data])
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          handleClose(true);
          setTimeout(() => {
            setShowAlert("");
          }, 2000);
        }, 1000);
      })
      .catch((err) => {
        setShowAlert("error");
        setTimeout(() => {
          setShowAlert("");
        }, 3000);
      });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {initialData?.id ? "Edit" : "Create"} Mapping
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "calc(100% - 64px)" }}
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Route</InputLabel>
                  <Controller
                    name="route_id"
                    control={control}
                    rules={{ required: "Route is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Route"
                        error={!!errors.route_id}
                      >
                        {routesData.map((item) => (
                          <MenuItem key={item.route_id} value={item.route_id}>
                            From{" "}
                            <strong className="ms-1 me-1">
                              {item.start_point_name}
                            </strong>{" "}
                            to{" "}
                            <strong className="ms-1 me-1">
                              {item.end_point_name}
                            </strong>
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle</InputLabel>
                  <Controller
                    name="vehicle_id"
                    control={control}
                    rules={{ required: "Vehicle is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Vehicle"
                        error={!!errors.vehicle_id}
                      >
                        {vehiclesData.map((item) => (
                          <MenuItem
                            key={item.vehicle_id}
                            value={item.vehicle_id}
                          >
                            {item.vehicle_registration_number} -{" "}
                            {item.vehicle_type}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Trip type</InputLabel>
                  <Controller
                    name="trip_type_id"
                    control={control}
                    rules={{ required: "Trip type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Trip type"
                        error={!!errors.trip_type_id}
                      >
                        {tripTypesData.map((item) => (
                          <MenuItem
                            key={item.trip_type_id}
                            value={item.trip_type_id}
                          >
                            {item.trip_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Staff</InputLabel>
                  <Controller
                    name="staff_ids"
                    control={control}
                    rules={{ required: "Staff is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Staff"
                        multiple
                        value={field.value || []} // Ensures the value is an array
                        error={!!errors.staff_ids}
                      >
                        {staffData.map((item) => (
                          <MenuItem key={item.staff_id} value={item.staff_id}>
                            {item.staff_name} - {item.staff_role}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="travel_date"
                  control={control}
                  rules={{
                    required: "Travel date is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Travel date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.travel_date}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" type="reset" onClick={() => reset()}>
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>

      {showAlert && (
        <div>
          {showAlert === "success"
            ? "Mapping update succeeded!"
            : "Mapping update failed!"}
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateMapping;
