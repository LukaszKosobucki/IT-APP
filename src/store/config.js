import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";

const rootReducer = combineReducers({ auth: authReducer });

export default configureStore({
  reducer: rootReducer,
});
