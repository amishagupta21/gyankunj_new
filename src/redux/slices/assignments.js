import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: null,
  data: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      return { ...action.payload };
    },
    addAssignments: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
  },
});

export const { setAssignments, addAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
