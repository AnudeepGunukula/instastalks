import React from "react";
import userInfoSlice from "./userInfoSliceReducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
  },
});

export default store;
