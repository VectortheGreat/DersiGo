import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import modalSlice from "./features/modalSlice";
import paginationSlice from "./features/paginationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      modal: modalSlice,
      pagination: paginationSlice,
    },
  });
};
