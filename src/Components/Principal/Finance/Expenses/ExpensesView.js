import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Slide,
} from "@mui/material";
import {
  deleteFeesStructure,
  fetchExpensesList,
  fetchFeesMetadata,
  fetchexpensesList,
  getGradeDetails,
} from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import { Delete, MoreVert } from "@mui/icons-material";
import { showAlertMessage } from "../../../AlertMessage";
import CreateExpense from "./CreateExpense";
import DateRangePickerComponent from "../../../DateRangePickerComponent";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExpensesView = () => {
  const [metadata, setMetadata] = useState({
    feeTypes: {},
    feeFrequencies: {},
    feeOccurrences: {},
    grades: {},
  });
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(), // Today's date
    endDate: dayjs().add(1, "month"), // One month from today
  });

  const handleDateRangeChange = (range) => {
    setDateRange(range); // Update date range state
    console.log("Date Range updated:", range);
    fetchExpensesData();
  };


  const fetchExpensesData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchExpensesList( dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      dayjs(dateRange.endDate).format("YYYY-MM-DD"));
      setExpensesList(response?.data?.expenses_data || []);
    } catch (err) {
      console.error("Failed to fetch fees structures:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = (isSubmit) => {
    setIsModalVisible(false);
    setSelectedExpenseId(null);
    if (isSubmit) {
      fetchExpensesData();
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "release_date",
        header: "Release_date"
      },      
      {
        accessorKey: "item_name",
        header: "Item name",
      },
      {
        accessorKey: "organization_name",
        header: "Organization name",
      },
      {
        accessorKey: "bill_number",
        header: "Bill number",
      },
      {
        accessorKey: "bill_amount",
        header: "Bill amount",
      },
      {
        accessorKey: "received_by",
        header: "Received by",
      }
    ],
    []
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <DateRangePickerComponent
        range={dateRange}
        onChange={handleDateRangeChange}
      />
        <Button variant="contained" onClick={() => setIsModalVisible(true)}>
          Create new expense
        </Button>
      </Box>

      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={expensesList}
        renderTopToolbar={() => (
          <h1 style={{ fontSize: 18, marginTop: 10 }}>Expenses</h1>
        )}
      />

      {isModalVisible && (
        <CreateExpense
          isOpen={isModalVisible}
          handleClose={handleModalClose}
          metadata={metadata}
        />
      )}

      {alert.type &&
        showAlertMessage({
          open: true,
          alertFor: alert.type,
          message: alert.message,
        })}
    </>
  );
};

export default ExpensesView;
