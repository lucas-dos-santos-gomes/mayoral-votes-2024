import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  auth,
  authError,
} from "./config.mjs";

const signupForm = document.querySelector('.sign-up-container form');
const signinForm = document.querySelector('.sign-in-container form');

signupForm.onsubmit = event => {
  event.preventDefault();
  const name = event.target[0].value.trim();
  const email = event.target[1].value.trim();
  const password = event.target[2].value.trim();

  createUserWithEmailAndPassword(auth, email, password).then(async credentials => {
    await updateProfile(auth.currentUser, { displayName: name });
    const userCredentials = {
      name: name,
      email: email,
      uid: credentials.user.uid,
    }
    sessionStorage.setItem('user-creds', JSON.stringify(userCredentials));
    alert('Cadastro realizado!');
    window.location.href = '/src/pages/vote.html';
  }).catch(error => {
    alert(authError(error.message));
    console.log(error);
  });
}

signinForm.onsubmit = event => {
  event.preventDefault();
  const email = event.target[0].value.trim();
  const password = event.target[1].value.trim();

  setPersistence(auth, browserLocalPersistence).then(signInWithEmailAndPassword(auth, email, password).then(credentials => {
    const userCredentials = {
      name: credentials.user.displayName,
      email: credentials.user.email,
      uid: credentials.user.uid,
    }
    sessionStorage.setItem('user-creds', JSON.stringify(userCredentials));
    alert('Login feito com sucesso!');
    window.location.href = '/src/pages/vote.html';
  }).catch(error => {
    btn.removeAttribute('disabled');
    alert("Não foi posssível fazer o login.");
    console.log(error);
    console.log(error.message);
  })).catch(err => {
    alert('Ocorreu um erro. Atualize a página e tente novamente.');
    console.log(err)
  });
}