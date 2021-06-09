import firebase from "firebase/app";
import { logNetworkError } from "../../utils/error";

export const getMyTeams = (teamsId) => {
  let teams = null;
  firebase
    .firestore()
    .collection("teams")
    .get()
    .where(firebase.firestore.FieldPath.documentId(), "in", teamsId)
    .then((docs) => {
      teams = docs.docs.map((doc) => ({
        team: doc.data(),
      }));
      console.log(teams);
    })
    .catch(console.error);
};

export const getTeam = (teamId) =>
  firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .get()
    .then((doc) =>
      Promise.all([
        doc.data().image &&
          firebase.storage().ref(doc.data().image).getDownloadURL(),
        { ...doc.data(), id: doc.id },
      ])
    )
    .catch(console.error);

export const getTeamMembers = (teamMembersIds) => {
  try {
    const teamMembers = teamMembersIds.map((id) =>
      firebase.firestore().collection("users").doc(id).get()
    );
    return Promise.all(teamMembers);
  } catch (error) {
    logNetworkError(error);
  }
};

export const getTeamMembersImages = async (teamMembers) => {
  try {
    const images = await Promise.all(
      teamMembers.map((member) =>
        firebase.storage().ref(member.avatar).getDownloadURL()
      )
    );
    return teamMembers.map((member, index) => ({
      ...member,
      avatarURL: images[index],
    }));
  } catch (error) {
    logNetworkError(error);
  }
};
