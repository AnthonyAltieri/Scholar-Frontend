/**
 * @author Anthony Altieri on 9/22/16.
 */

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAOVULd806sbZ7TDOwE48qWtN6JqUhQ3qg",
  authDomain: "scholar-af167.firebaseapp.com",
  databaseURL: "https://scholar-af167.firebaseio.com",
  storageBucket: "",
};
const fb = firebase.initializeApp(config);

export default fb;
