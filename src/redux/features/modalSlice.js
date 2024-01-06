import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEditModal: false,
  postEditModal: false,
  warningModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleUserEditModal: (state) => {
      state.userEditModal = !state.userEditModal;
    },
    togglePostEditModal: (state) => {
      state.postEditModal = !state.postEditModal;
    },
    toggleWarningModal: (state) => {
      state.warningModal = !state.warningModal;
    },
  },
});

export const { toggleUserEditModal, togglePostEditModal, toggleWarningModal } = modalSlice.actions;

export default modalSlice.reducer;
