import firebase from "firebase/app";
import { clearUserData } from "./";
import { logNetworkError } from "../../utils/error";

export const logOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        console.log("Successfully logged out");
        dispatch(clearUserData());
      })
      .catch((error) => {
        console.log("Could not log out");
        console.error(error);
      });
  };
};

export const fetchUserData = (userId) => {
  const userRef = firebase.firestore().collection("users").doc(userId);
  return userRef.get();
};

export const editUserData = (userId, userData) =>
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update(userData)
    .catch(logNetworkError);
