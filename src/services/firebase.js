import { push } from "react-burger-menu";
import firebaseConfig from "./firebaseConfig";

export const dbUsers = firebaseConfig.firestore();

export const signIn = (email, pwd, push, route) => {
  try {
    firebaseConfig.auth().signInWithEmailAndPassword(email, pwd);
    push(route);
  } catch (error) {
    alert(error);
  }
}

export const logout = (push, route) => {
  try {
    firebaseConfig.auth().signOut();
    push(route);
  } catch (error) {
    alert(error);
  }
}

export const forgotPassword = (email) => {
  firebaseConfig.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Veuillez vérifier votre boîte mail.');
    }).catch((err) => {
      console.log(err)
    })
}
