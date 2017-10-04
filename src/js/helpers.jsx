import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDbyMGkePoSd_rIla29tLgH1qqfyX_Y55k",
    authDomain: "csbw-b6d74.firebaseapp.com",
    databaseURL: "https://csbw-b6d74.firebaseio.com",
    projectId: "csbw-b6d74",
    storageBucket: "csbw-b6d74.appspot.com",
    messagingSenderId: "132352461723"
};
firebase.initializeApp(config);

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function verify(){
  return firebaseAuth().currentUser.getToken(true);
}

export function verifyUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}