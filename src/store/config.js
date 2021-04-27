import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import sportReducer from "./reducer/sports";

const rootReducer = combineReducers({ auth: authReducer, sport: sportReducer });

export default configureStore({
  reducer: rootReducer,
});
