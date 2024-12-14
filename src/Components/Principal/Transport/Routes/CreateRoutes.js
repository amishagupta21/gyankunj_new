import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Button, TextField, Grid, Box } from "@mui/material";
import { AddCircle, RemoveOutlined } from "@mui/icons-material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateTransportRoutes } from "../../../../ApiClient";
import AddBoxIcon from "@mui/icons-material/AddBox";

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

const CreateRoutes = ({ isOpen, handleClose, initialData = [] }) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start_point_name: "",
      route_stop_info: [
        {
          route_name: "",
          stop_points: [{ stop_point_name: "", route_charge: "" }],
        },
      ],
    },
  });

  const {
    fields: routeFields,
    append: appendRoute,
    remove: removeRoute,
  } = useFieldArray({
    control,
    name: "route_stop_info",
  });

  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    if (initialData) {
      reset({
        start_point_name: initialData.start_point_name || "",
        route_stop_info: initialData.route_stop_info || [
          {
            route_name: "",
            stop_points: [{ stop_point_name: "", route_charge: "" }],
          },
        ],
      });
    }
  }, [initialData, reset]);

  const handleAddStop = (routeIndex) => {
    const updatedRoutes = [...getValues("route_stop_info")];
    updatedRoutes[routeIndex].stop_points.push({
      stop_point_name: "",
      route_charge: "",
    });
    reset({
      ...getValues(),
      route_stop_info: updatedRoutes,
    });
  };

  const handleRemoveStop = (routeIndex, stopIndex) => {
    const updatedRoutes = [...getValues("route_stop_info")];
    updatedRoutes[routeIndex].stop_points.splice(stopIndex, 1);
    reset({
      ...getValues(),
      route_stop_info: updatedRoutes,
    });
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);

    updateTransportRoutes(data)
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
          Configure Routes
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
            <Box sx={{ marginBottom: 3 }}>
              <Controller
                name="start_point_name"
                control={control}
                rules={{ required: "Start Point Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Start Point Name"
                    error={!!errors.start_point_name}
                  />
                )}
              />
            </Box>
            {routeFields.map((route, routeIndex) => (
              <Box key={route.id} sx={{ marginBottom: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name={`route_stop_info.${routeIndex}.route_name`}
                      control={control}
                      rules={{ required: "Route Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={`Route Name ${routeIndex + 1}`}
                          error={
                            !!errors.route_stop_info?.[routeIndex]?.route_name
                          }
                        />
                      )}
                    />
                  </Grid>

                  {route.stop_points.map((stop, stopIndex) => (
                    <Grid container item xs={12} spacing={2} key={stopIndex}>
                      <Grid item xs={6}>
                      <Controller
                        name={`route_stop_info.${routeIndex}.stop_points.${stopIndex}.stop_point_name`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Stop Point Name"
                            error={
                              !!errors.route_stop_info?.[routeIndex]?.stop_points?.[stopIndex]?.stop_point_name
                            }
                          />
                        )}
                      />
                      </Grid>
                      <Grid item xs={5}>
                        <Controller
                          name={`route_stop_info.${routeIndex}.stop_points.${stopIndex}.route_charge`}
                          control={control}
                          rules={{ required: "Route Charge is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Route Charge"
                              type="number"
                              error={
                                !!errors.route_stop_info?.[routeIndex]
                                  ?.stop_points?.[stopIndex]?.route_charge
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        xs={1}
                      >
                        {route.stop_points.length !== 1 && (
                          <DeleteIcon
                            color="error"
                            fontSize="large"
                            onClick={() =>
                              handleRemoveStop(routeIndex, stopIndex)
                            }
                          />
                        )}
                        {route.stop_points.length === stopIndex + 1 && (
                          <AddBoxIcon
                            color="success"
                            fontSize="large"
                            onClick={() => handleAddStop(routeIndex)}
                          />
                        )}
                      </Grid>
                    </Grid>
                  ))}

                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    item
                    xs={12}
                  >
                    {routeFields.length !== 1 && (
                      <DeleteIcon
                        color="error"
                        fontSize="large"
                        onClick={() => removeRoute(routeIndex)}
                      />
                    )}
                    {routeFields.length === routeIndex + 1 && (
                      <AddBoxIcon
                        color="success"
                        fontSize="large"
                        onClick={() =>
                          appendRoute({
                            route_name: "",
                            stop_points: [
                              { stop_point_name: "", route_charge: "" },
                            ],
                          })
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}
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
            ? "Routes update succeeded!"
            : "Routes update failed!"}
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateRoutes;
