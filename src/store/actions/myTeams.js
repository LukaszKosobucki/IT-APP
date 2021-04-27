import firebase from "firebase/app";

export const getMyTeams = () => {
    return () => {
        firebase.firestore().collection("teams").get().then((docs) => {
            const teams = docs.docs.map((doc) => ({
                team: doc.data()
            }));
            return teams;
        }).catch(console.error);
    };
};
