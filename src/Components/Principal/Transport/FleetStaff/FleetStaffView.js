import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { getAllFleetStaffsList } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateFleetStaff from "./CreateFleetStaff";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

const FleetStaffView = () => {
  const [fleetStaffsList, setFleetStaffsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFleetStaff, setSelectedFleetStaff] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllFleetStaffsList()
      .then((res) => {
        setFleetStaffsList([]);
        if (res?.data?.staff_data?.length > 0) {
          setFleetStaffsList(res.data.staff_data);
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
    setSelectedFleetStaff(rowData);
    setIsModalVisible(true);
    handleMenuClose();
  };

  const handleDelete = (rowData) => {
    setSelectedFleetStaff(rowData);
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
    setSelectedFleetStaff(null);
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
        accessorKey: "staff_name",
        header: "Staff name",
        Cell: ({ row }) => (
          <div className="align-items-center d-flex justify-content-between">
            <div className="text-truncate">{row.original.staff_name}</div>
            <IconButton
              onClick={(event) => handleMenuOpen(event, row.original.staff_id)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && menuRowId === row.original.staff_id}
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
      { accessorKey: "employee_id", header: "Employee id" },
      { accessorKey: "staff_role", header: "Staff role" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "date_of_birth", header: "Date of birth" },
      { accessorKey: "phone_number", header: "Phone number" },
      { accessorKey: "license_number", header: "License number" },
      { accessorKey: "license_expiry_date", header: "License expiry date" },
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
          Create Fleet Staff
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
        data={fleetStaffsList || []}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Fleet Staff</h1>
        )}
      />
      {isModalVisible && (
        <CreateFleetStaff
          isOpen={isModalVisible}
          handleClose={handleClose}
          initialData={selectedFleetStaff}
        />
      )}
    </>
  );
};

export default FleetStaffView;
