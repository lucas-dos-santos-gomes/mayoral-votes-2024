import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,

  db,
  auth,
  signout,
  verifyUser,
  authError,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "./config.mjs";

onAuthStateChanged(auth, user => {
  if(user) {
    location.pathname = '/src/pages/vote.html';
  }
});

const signupForm = document.querySelector('.sign-up-container form');
const signinForm = document.querySelector('.sign-in-container form');

signupForm.onsubmit = ev => {
  ev.preventDefault();
  const name = ev.target[0];
  const email = ev.target[1];
  const password = ev.target[2];

  createUserWithEmailAndPassword(auth, email.value.trim(), password.value).then(async credentials => {
    await setDoc(doc(db, '/indicators/15/voters/', credentials.user.uid), { name: name.value, email: email.value });
    console.log(credentials);
    
    await updateProfile(auth.currentUser, { displayName: name.value.trim() });
    alert('Cadastro realizado!');
    sessionStorage.setItem('uid', JSON.stringify(credentials.user.uid));
    window.location.href = '/src/pages/vote.html';
  }).catch(error => {
    alert(authError(error.message));
    console.log(error);
  });
}

signinForm.onsubmit = ev => {
  ev.preventDefault();
  const email = ev.target[0];
  const password = ev.target[1];

  setPersistence(auth, browserLocalPersistence).then(signInWithEmailAndPassword(auth, email.value, password.value).then(credentials => {
    alert('Login feito com sucesso!');
    sessionStorage.setItem('uid', JSON.stringify(credentials.user.uid));
    window.location.href = '/src/pages/vote.html';
  }).catch(error => {
    btn.removeAttribute('disabled');
    alert("Não foi posssível fazer o login.");
    console.log(error);
    console.log(error.message);
  })).catch(err => console.log(err));
}