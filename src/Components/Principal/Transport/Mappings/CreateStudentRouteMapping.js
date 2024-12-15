import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { updateTransportRoutes } from "../../../../ApiClient";

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

const CreateStudentRouteMapping = ({
  isOpen,
  handleClose,
  routesList = [],
  studentList = [],
  initialData = null,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      route_id: "",
      route_student_info: [
        {
          stop_point_id: "",
          student_ids: [],
        },
      ],
    },
  });

  const [routesData, setRoutesData] = useState(routesList);
  const [studentData, setStudentData] = useState(studentList);
  const [routesStopsDataByRouteId, setRoutesStopsDataByRouteId] = useState({});
  const [selectedStopPoints, setSelectedStopPoints] = useState(new Set());
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  const {
    fields: routeFields,
    append: appendRoute,
    remove: removeRoute,
  } = useFieldArray({
    control,
    name: "route_student_info",
  });

  useEffect(() => {
    // Map route_id to stop_points_data for dynamic population of stop points
    const stopDataById = {};
    routesData.forEach((item) => {
      stopDataById[item.route_id] = item.stop_points_data || [];
    });
    setRoutesStopsDataByRouteId(stopDataById);

    if (initialData) {
      reset({
        route_id: initialData.route_id || "",
        route_student_info: initialData.route_student_info || [
          {
            stop_point_id: "",
            student_ids: [],
          },
        ],
      });
      updateSelections(initialData.route_student_info);
    }
  }, [initialData, reset, routesData]);

  const updateSelections = (routeStudentInfo) => {
    const newStopPoints = new Set();
    const newStudents = new Set();

    routeStudentInfo.forEach((info) => {
      if (info.stop_point_id) newStopPoints.add(info.stop_point_id);
      if (info.student_ids && info.student_ids.length > 0) {
        info.student_ids.forEach((id) => newStudents.add(id));
      }
    });

    setSelectedStopPoints(newStopPoints);
    setSelectedStudents(newStudents);
  };

  const handleAddStop = () => {
    appendRoute({
      stop_point_id: "",
      student_ids: [],
    });
  };

  const handleRemoveStop = (index) => {
    const currentValues = getValues("route_student_info")[index];

    if (currentValues.stop_point_id) {
      setSelectedStopPoints((prev) => {
        const updated = new Set(prev);
        updated.delete(currentValues.stop_point_id);
        return updated;
      });
    }

    if (currentValues.student_ids) {
      setSelectedStudents((prev) => {
        const updated = new Set(prev);
        currentValues.student_ids.forEach((id) => updated.delete(id));
        return updated;
      });
    }

    removeRoute(index);
  };

  const handleRouteChange = (value) => {
    reset({
      route_id: value,
      route_student_info: [
        {
          stop_point_id: "",
          student_ids: [],
        },
      ],
    });
    setSelectedStopPoints(new Set());
    setSelectedStudents(new Set());
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);

    updateTransportRoutes(data)
      .then((res) => {
        if (res?.data?.status === "success") {
          handleClose(true);
        } else {
          alert("Failed to update routes.");
        }
      })
      .catch(() => {
        alert("Error updating routes.");
      });
  };

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle id="customized-dialog-title">
        Configure Student Routes
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
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {/* Route Selector */}
          <Box sx={{ marginBottom: 3 }}>
            <Controller
              name="route_id"
              control={control}
              rules={{ required: "Route selection is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="route-id-label">Select Route</InputLabel>
                  <Select
                    {...field}
                    labelId="route-id-label"
                    label="Select Route"
                    onChange={(e) => {
                      field.onChange(e);
                      handleRouteChange(e.target.value);
                    }}
                    error={!!errors.route_id}
                  >
                    {routesData.map((route) => (
                      <MenuItem key={route.route_id} value={route.route_id}>
                        {route.route_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          {/* Stop Points and Students Mapping */}
          {routeFields.map((route, index) => (
            <Box key={route.id} sx={{ marginBottom: 4 }}>
              <Grid container spacing={2} alignItems="center">
                {/* Stop Point Selector */}
                <Grid item xs={5}>
                  <Controller
                    name={`route_student_info.${index}.stop_point_id`}
                    control={control}
                    rules={{ required: "Stop Point selection is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id={`stop-point-label-${index}`}>
                          Select Stop Point
                        </InputLabel>
                        <Select
                          {...field}
                          labelId={`stop-point-label-${index}`}
                          label="Select Stop Point"
                          error={
                            !!errors.route_student_info?.[index]?.stop_point_id
                          }
                          onChange={(e) => {
                            const selectedValue = e.target.value;

                            // Update selected stop points
                            setSelectedStopPoints((prev) => {
                              const updated = new Set(prev);
                              if (field.value) updated.delete(field.value); // Remove old value
                              updated.add(selectedValue);
                              return updated;
                            });

                            field.onChange(e);
                          }}
                        >
                          {routesStopsDataByRouteId[getValues("route_id")]?.map(
                            (stop) => (
                              <MenuItem
                                key={stop.stop_point_id}
                                value={stop.stop_point_id}
                                disabled={selectedStopPoints.has(
                                  stop.stop_point_id
                                )}
                              >
                                {stop.stop_point_name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Student Selector */}
                <Grid item xs={5}>
                  <Controller
                    name={`route_student_info.${index}.student_ids`}
                    control={control}
                    rules={{
                      required: "At least one student must be selected",
                    }}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id={`student-ids-label-${index}`}>
                          Select Students
                        </InputLabel>
                        <Select
                          {...field}
                          labelId={`student-ids-label-${index}`}
                          multiple
                          renderValue={(selected) =>
                            studentData
                              .filter((s) => selected.includes(s.student_id))
                              .map((s) => s.student_name)
                              .join(", ")
                          }
                          error={
                            !!errors.route_student_info?.[index]?.student_ids
                          }
                          onChange={(e) => {
                            const selectedValues = e.target.value;

                            // Update selected students
                            setSelectedStudents((prev) => {
                              const updated = new Set(prev);

                              // Remove unselected values
                              field.value.forEach((id) => {
                                if (!selectedValues.includes(id)) {
                                  updated.delete(id);
                                }
                              });

                              // Add newly selected values
                              selectedValues.forEach((id) => updated.add(id));

                              return updated;
                            });

                            field.onChange(e);
                          }}
                        >
                          {studentData.map((student) => (
                            <MenuItem
                              key={student.student_id}
                              value={student.student_id}
                              disabled={selectedStudents.has(
                                student.student_id
                              )}
                            >
                              <Checkbox
                                checked={field.value.includes(
                                  student.student_id
                                )}
                              />
                              <ListItemText primary={student.student_name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={2} className="d-flex" textAlign="center">
                  {routeFields.length !== 1 && (
                    <DeleteIcon
                      color="error"
                      fontSize="large"
                      onClick={() => handleRemoveStop(index)}
                      sx={{ cursor: "pointer", marginRight: 2 }}
                    />
                  )}
                  {routeFields.length === index + 1 && (
                    <AddBoxIcon
                      color="success"
                      fontSize="large"
                      onClick={handleAddStop}
                      sx={{ cursor: "pointer" }}
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
  );
};

export default CreateStudentRouteMapping;
