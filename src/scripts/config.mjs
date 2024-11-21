import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBTe1r4WbFLP7gSTJ-zDAlQbhSBo1BZrfg",
  authDomain: "mayoral-votes-2024.firebaseapp.com",
  projectId: "mayoral-votes-2024",
  storageBucket: "mayoral-votes-2024.firebasestorage.app",
  messagingSenderId: "243191270536",
  appId: "1:243191270536:web:a254cde3cd33124954233d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function signout() {
  sessionStorage.removeItem('user-info');
  sessionStorage.removeItem('user-creds');
  signOut(auth);
}

function verifyUser(exit) {
  onAuthStateChanged(auth, user => {
    if(user) {
      console.log('Usuário autenticado:', user);
    } else {
      signout();
      if(exit) location.pathname = '/src/pages/sign.html';
    }
  });
}

const authError = (messageError, isLogin) => {
  console.error(messageError);
  if(messageError.includes('(auth/invalid-credential)')) {
    return 'A credencial de autenticação fornecida está incorreta, malformada ou expirou.';
  } else if(messageError.includes('(auth/too-many-requests)')) {
    return 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.';
  } else if(messageError.includes('(auth/invalid-email')) {
    return 'O endereço de e-mail está mal formatado.';
  } else if(messageError.includes('(auth/email-already-in-use)')) {
    return 'Esse endereço de E-mail já está cadastrado.';
  } else if(messageError.includes('(auth/popup-closed-by-user)')) {
    return 'Você fechou o pop-up antes de finalizar a operação.';
  } else if(messageError.includes('(auth/weak-password)')) {
    return 'A senha precisa ter, no mínimo, 6 caracteres.';
  } else if(isLogin) {
    return 'Houve um erro na autenticação.';
  } else {
    return 'Houve um problema na criação da conta. Tente novamente.';
  };
}

export {
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
};