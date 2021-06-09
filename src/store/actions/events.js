import firebase from "firebase/app";
import { logNetworkError } from "../../utils/error";

export const getEvents = () => {
  return () => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((docs) => {
        const events = docs.docs.map((doc) => ({
          data: doc.data(),
        }));
        return events;
      })
      .catch(console.error);
  };
};

export const getEvent = (id) =>
  firebase
    .firestore()
    .collection("events")
    .doc(id)
    .get()
    .then((doc) =>
      Promise.all([
        doc.data().image &&
          firebase.storage().ref(doc.data().image).getDownloadURL(),
        { ...doc.data(), id: doc.id },
      ])
    )
    .catch(console.error);

export const getParticipantsForEvent = (participantsIds, collection) => {
  try {
    const participants = participantsIds.map((id) =>
      firebase.firestore().collection(collection).doc(id).get()
    );
    return Promise.all(participants);
  } catch (error) {
    logNetworkError(error);
  }
};
