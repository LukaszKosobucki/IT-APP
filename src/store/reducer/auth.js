import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: null };

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = null;
    },
  },
});

export default authSlice.reducer;
export const actions = authSlice.actions;
