import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var firebaseConfig = {
  apiKey: "AIzaSyDLvABjM_Si2iyuKpO5ddJvewpYv-igK0Y",
  authDomain: "sports-event-app.firebaseapp.com",
  projectId: "sports-event-app",
  storageBucket: "sports-event-app.appspot.com",
  messagingSenderId: "286493677384",
  appId: "1:286493677384:web:6011238b5e11ebcec1457d",
  measurementId: "G-PYX2MPPC5K"
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
