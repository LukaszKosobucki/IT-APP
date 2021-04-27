import { createSlice } from "@reduxjs/toolkit";

const initialState = { sports: null };

const authSlice = createSlice({
  name: "sport",
  initialState,
  reducers: {
    setSports(state, action) {
      state.sports = action.payload;
    },
  },
});

export default authSlice.reducer;
export const actions = authSlice.actions;
