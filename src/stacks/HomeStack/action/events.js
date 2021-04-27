import firebase from "firebase/app";


export const getEvents = () =>{
    return () => {
        firebase
            .firestore()
            .collection('events')
            .get()
            .then((docs) => {
                const events = docs.docs.map((doc) => ({
                    data: doc.data()
                }));
            })
            .catch(console.error)
    }
  };