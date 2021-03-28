import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: null };

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
export const actions = authSlice.actions;
