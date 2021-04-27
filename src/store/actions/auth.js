import firebase from "firebase/app";
import { clearUserData } from "./";

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
