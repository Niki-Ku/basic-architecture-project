import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "../index";

export const doCreateUserWithEmailAndPassword = async (email: string, password:string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider);
  // result.user (maybe store in firestore)
  return result
}

export const doSignOut = () => {
  return auth.signOut();
}

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser!, password)
}

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser!, {
    url: `${window.location.origin}/home`
  })
}