import firebase from "firebase/app";

export const getMyTeams = () => {
  let teams = null;
  firebase
    .firestore()
    .collection("teams")
    .get()
    .then((docs) => {
      teams = docs.docs.map((doc) => ({
        team: doc.data(),
      }));
      console.log(teams);
    })
    .catch(console.error);
};
