import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { fetchExpensesList } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";
import CreateExpense from "./CreateExpense";
import DateRangePickerComponent from "../../../DateRangePickerComponent";
import dayjs from "dayjs";

const ExpensesView = () => {
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "month"),
  });

  const fetchExpensesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchExpensesList(
        dayjs(dateRange.startDate).format("YYYY-MM-DD"),
        dayjs(dateRange.endDate).format("YYYY-MM-DD")
      );
      setExpensesList(response?.data?.expenses_data || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchExpensesData();
  }, []);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleModalClose = (isSubmit) => {
    setIsModalVisible(false);
    if (isSubmit) fetchExpensesData();
  };

  const columns = useMemo(
    () => [
      { accessorKey: "release_date", header: "Release Date" },
      { accessorKey: "item_name", header: "Item Name" },
      { accessorKey: "organization_name", header: "Organization Name" },
      { accessorKey: "bill_number", header: "Bill Number" },
      { accessorKey: "bill_amount", header: "Bill Amount" },
      { accessorKey: "received_by", header: "Received By" },
    ],
    []
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <DateRangePickerComponent range={dateRange} onChange={handleDateRangeChange} />
        <Button variant="contained" onClick={() => setIsModalVisible(true)}>
          Create New Expense
        </Button>
      </Box>

      <CommonMatTable
        columns={columns}
        isLoading={isLoading}
        data={expensesList}
        renderTopToolbar={() => <Typography variant="h6">Expenses</Typography>}
      />

      {isModalVisible && <CreateExpense isOpen={isModalVisible} handleClose={handleModalClose} />}
    </>
  );
};

export default ExpensesView;