import firebase from "firebase/app";
import { setSports } from "./";

export const getSports = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("sports")
      .get()
      .then((docs) => {
        const sports = docs.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.id,
        }));
        dispatch(setSports(sports));
      })
      .catch(console.error);
  };
};
