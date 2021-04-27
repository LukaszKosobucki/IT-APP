import { actions as authActions } from "../reducer/auth";
import { actions as sportActions } from "../reducer/sports";

export const setUserData = authActions.setUserData;
export const clearUserData = authActions.clearUserData;

export const setSports = sportActions.setSports;
