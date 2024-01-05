import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEditModal: false,
  warningModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleUserEditModal: (state) => {
      state.userEditModal = !state.userEditModal;
    },
    toggleWarningModal: (state) => {
      state.warningModal = !state.warningModal;
    },
  },
});

export const { toggleUserEditModal, toggleWarningModal } = modalSlice.actions;

export default modalSlice.reducer;
