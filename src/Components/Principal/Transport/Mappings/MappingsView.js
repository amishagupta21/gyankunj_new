import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { getAllMappingsList } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import CreateMapping from "./CreateMapping";

const MappingsView = () => {
  const [mappingsList, setMappingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllMappingsList()
      .then((res) => {
        setMappingsList([]);
        if (res?.data?.route_staff_mappings_data?.length > 0) {
          setMappingsList(res.data.route_staff_mappings_data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [refreshTable]);

  const handleEdit = (rowData) => {
    setSelectedMapping(rowData);
    setIsModalVisible(true);
    handleMenuClose();
  };

  const handleDelete = (rowData) => {
    setSelectedMapping(rowData);
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
    setSelectedMapping(null);
    if (isSubmit) {
      setTimeout(() => {
        setRefreshTable(!refreshTable);
      }, 500);
    }
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "route_id",
        header: "Route name",
        Cell: ({ row }) => (
          <div className="align-items-center d-flex justify-content-between">
            <div className="text-truncate">{row.original.route_id}</div>
            <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && menuRowId === row.id}
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
      {
        accessorKey: "vehicle_registration_number",
        header: "Vehicle registration number",
      },
      { accessorKey: "vehicle_type", header: "Vehicle type" },
      { accessorKey: "travel_date", header: "Travel date" },
      { accessorKey: "travel_status", header: "Travel status" },
      { accessorKey: "trip_type_name", header: "Trip type name" },
      {
        accessorKey: "staff_names",
        header: "Staff names",
        Cell: ({ row }) => <div>{row.original.staff_names?.join(", ")}</div>,
      },
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
        <Button variant="contained" onClick={() => setIsModalVisible(true)}>
          Create mapping
        </Button>
      </Box>
    );
  };

  return (
    <>
      <RenderTopToolbarCustomActions />

      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={mappingsList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Mapping</h1>
        )}
      />
      {isModalVisible && (
        <CreateMapping
          isOpen={isModalVisible}
          handleClose={handleClose}
          initialData={selectedMapping}
        />
      )}
    </>
  );
};

export default MappingsView;
