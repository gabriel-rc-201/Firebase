// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDDOtx7R6iCKddA7Xb6_MKeUMotdqqyVqw",
  authDomain: "colegio-3d804.firebaseapp.com",
  projectId: "colegio-3d804",
  storageBucket: "colegio-3d804.appspot.com",
  messagingSenderId: "963984049821",
  appId: "1:963984049821:web:9ffa4808016a24b5a63674",
  measurementId: "G-XEHS0MQH2M",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var auth = firebase.auth();
var db = firebase.firestore();
function criarUsuario() {
  let newUserEmail = "novoteste@teste.com";
  let newUserPassword = "123123";

  auth
    .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

function login() {
  let userEmail = "novoteste@teste.com";
  let oserPassword = "123123";

  auth
    .signInWithEmailAndPassword(userEmail, oserPassword)
    .then((loggedUser) => {
      console.log(loggedUser);
    })
    .catch((err) => {
      console.log(err);
    });
}

// login();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("Ninguem logado");
  }
});

function logout() {
  auth
    .signOut()
    .then(() => {
      console.log("usuario deslogado");
    })
    .catch((err) => {
      console.log(err);
    });
}

console.log(firebase.auth.Auth.Persistence);

// setTimeout(logout, 2000);
