import firebase from "firebase";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDLvABjM_Si2iyuKpO5ddJvewpYv-igK0Y",
  authDomain: "sports-event-app.firebaseapp.com",
  projectId: "sports-event-app",
  storageBucket: "sports-event-app.appspot.com",
  messagingSenderId: "286493677384",
  appId: "1:286493677384:web:6011238b5e11ebcec1457d",
  measurementId: "G-PYX2MPPC5K",
};

export default firebase.initializeApp(config);
export const auth = firebase.auth();