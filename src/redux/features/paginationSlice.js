import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  limit: 20,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    selectPageValue: (state, action) => {
      state.page = parseInt(action.payload) - 1;
    },
    changePageValue: (state, action) => {
      state.page += action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { selectPageValue, changePageValue, setLimit } = paginationSlice.actions;

export default paginationSlice.reducer;
