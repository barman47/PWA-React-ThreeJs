import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// function displayNotification() {
//     document
//         .querySelector("#notification")
//         .style.display = "block";
// }

registerServiceWorker.register();
//
// document.querySelector("#on-activation-request")
//     .addEventListener("click", () => {
//         // On récupère le Service Worker
//         // qui a fini de s'installer
//         // (waiting)
//         navigator.serviceWorker
//             .getRegistration()
//             .then(registration => {
//                 // Et on lui envoie le
//                 // message d'activation
//                 registration.waiting
//                     .postMessage("skipWaiting");
//             });
//     });
