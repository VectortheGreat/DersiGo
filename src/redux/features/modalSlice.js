import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEditModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleUserEditModal: (state) => {
      state.userEditModal = !state.userEditModal;
    },
  },
});

export const { toggleUserEditModal } = modalSlice.actions;

export default modalSlice.reducer;
