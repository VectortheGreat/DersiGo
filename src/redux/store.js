import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import modalSlice from "./features/modalSlice";
import paginationSlice from "./features/paginationSlice";
import postSlice from "./features/postSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      post: postSlice,
      modal: modalSlice,
      pagination: paginationSlice,
    },
  });
};
