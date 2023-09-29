import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const userInfoSlice = createSlice({
  initialState: initialState,
  name: "userInfo",
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
