import firebaseConfig from "./firebaseConfig";

export const dbUsers = firebaseConfig.firestore();

export const signIn = (email, pwd, push, route) => {
    try {
        firebaseConfig.auth().signInWithEmailAndPassword(email, pwd);
        console.log('PUSH LOGIN', push);
        console.log('SIGNIN FIREBASE', firebaseConfig.auth());
        push(route);
      } catch (error) {
        alert(error);
      }
}

export const logout = (push, route) => {
    try {
        firebaseConfig.auth().signOut();
        console.log('PUSH LOGOUT', push);
        console.log('LOGOUT FIREBASE', firebaseConfig.auth());
        push(route);
      } catch (error) {
        alert(error);
      }
}