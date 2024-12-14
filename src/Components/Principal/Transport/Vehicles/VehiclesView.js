import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";
import {
  createVehicleType,
  getAllVehiclesList,
  getAllVehicleTypes,
} from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateVehicle from "./CreateVehicle";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { showAlertMessage } from "../../../AlertMessage";

const VehiclesView = () => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [isVehicleTypeModalVisible, setIsVehicleTypeModalVisible] =
    useState(false);
  const [newVehicleTypes, setNewVehicleTypes] = useState([]);
  const [vehicleTypeInput, setVehicleTypeInput] = useState("");
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllVehiclesList()
      .then((res) => {
        setVehiclesList([]);
        if (res?.data?.vehicles_data?.length > 0) {
          setVehiclesList(res.data.vehicles_data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    getAllVehicleTypes()
      .then((res) => {
        setVehicleTypes([]);
        if (res?.data?.vehicle_types_data?.length > 0) {
          setVehicleTypes(res.data.vehicle_types_data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshTable]);

  const handleEdit = (rowData) => {
    setSelectedVehicle(rowData);
    setIsModalVisible(true);
    handleMenuClose();
  };

  const handleDelete = (rowData) => {
    setSelectedVehicle(rowData);
    handleMenuClose();
  };

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleClose = (isSubmit) => {
    setIsModalVisible(false);
    setSelectedVehicle(null);
    if (isSubmit) {
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  const handleVehicleTypeModalClose = () => {
    setIsVehicleTypeModalVisible(false);
    setNewVehicleTypes([]);
    setVehicleTypeInput("");
  };

  const handleSaveVehicleTypes = () => {
    const payload = {
      vehicle_types: newVehicleTypes,
    };

    // Mock API call to save vehicle types
    console.log("Saving Vehicle Types: ", payload);

    createVehicleType(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowAlert("success");
        } else {
          setShowAlert("error");
        }
        setTimeout(() => {
          setRefreshTable(!refreshTable);
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
    handleVehicleTypeModalClose();
  };

  const handleAddVehicleType = () => {
    if (
      vehicleTypeInput.trim() &&
      !newVehicleTypes.includes(vehicleTypeInput)
    ) {
      setNewVehicleTypes((prev) => [...prev, vehicleTypeInput.trim()]);
      setVehicleTypeInput("");
    }
  };

  const handleDeleteVehicleTypeChip = (chipToDelete) => {
    setNewVehicleTypes((prev) => prev.filter((chip) => chip !== chipToDelete));
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicle_owner",
        header: "Vehicle owner",
        Cell: ({ row }) => (
          <div className="align-items-center d-flex justify-content-between">
            <div className="text-truncate">{row.original.vehicle_owner}</div>
            <IconButton
              onClick={(event) =>
                handleMenuOpen(event, row.original.vehicle_id)
              }
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && menuRowId === row.original.vehicle_id}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleEdit(row.original)}>
                <Edit fontSize="small" sx={{ marginRight: 1 }} /> Edit
              </MenuItem>
              <MenuItem
                className="disabled"
                onClick={() => handleDelete(row.original)}
              >
                <Delete fontSize="small" sx={{ marginRight: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </div>
        ),
        size: 50,
      },
      { accessorKey: "vehicle_type", header: "Vehicle type" },
      {
        accessorKey: "vehicle_registration_number",
        header: "Registration number",
      },
      { accessorKey: "manufacturing_date", header: "Manufacturing date" },
      { accessorKey: "insurance_expiry_date", header: "Insurance expiry date" },
      { accessorKey: "pollution_expiry_date", header: "Pollution expiry date" },
    ],
    [anchorEl, menuRowId]
  );

  // Custom JSX element for the top toolbar
  const RenderTopToolbarCustomActions = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsVehicleTypeModalVisible(true)}
        >
          Create Vehicle Type
        </Button>
        <Tooltip
          title={
            !(vehicleTypes?.length > 0)
              ? "Please add vehicle types before creating a vehicle."
              : ""
          }
          arrow
        >
          <span>
            <Button
              variant="contained"
              disabled={!(vehicleTypes?.length > 0)}
              onClick={() => setIsModalVisible(true)}
            >
              Create Vehicle
            </Button>
          </span>
        </Tooltip>
      </Box>
    );
  };

  return (
    <>
      <RenderTopToolbarCustomActions />

      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={vehiclesList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Vehicles</h1>
        )}
      />
      {isModalVisible && (
        <CreateVehicle
          isOpen={isModalVisible}
          handleClose={handleClose}
          vehicleTypes={vehicleTypes}
          initialData={selectedVehicle}
        />
      )}
      {isVehicleTypeModalVisible && (
        <Dialog
          open={isVehicleTypeModalVisible}
          onClose={handleVehicleTypeModalClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Vehicle Type</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                marginBottom: 2,
              }}
            >
              {newVehicleTypes.map((type, index) => (
                <Chip
                  key={index}
                  label={type}
                  onDelete={() => handleDeleteVehicleTypeChip(type)}
                  color="primary"
                />
              ))}
            </Box>
            <TextField
              label="Add Vehicle Type"
              fullWidth
              value={vehicleTypeInput}
              error={vehicleTypes?.some(
                (type) =>
                  type.vehicle_type.toLowerCase() ===
                  vehicleTypeInput.trim().toLowerCase()
              )}
              helperText={
                vehicleTypes?.some(
                  (type) =>
                    type.vehicle_type.toLowerCase() ===
                    vehicleTypeInput.trim().toLowerCase()
                )
                  ? "The vehicle type you entered already exists."
                  : ""
              }
              onChange={(e) => setVehicleTypeInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !vehicleTypes?.some(
                    (type) =>
                      type.vehicle_type.toLowerCase() ===
                      vehicleTypeInput.trim().toLowerCase()
                  )
                ) {
                  handleAddVehicleType();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVehicleTypeModalClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveVehicleTypes}
              disabled={newVehicleTypes.length === 0}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `Vehicle type creation ${
            showAlert === "success" ? "succeeded" : "failed"
          }.`,
        })}
    </>
  );
};

export default VehiclesView;
