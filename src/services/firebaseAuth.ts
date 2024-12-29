import { setPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, Persistence } from "firebase/auth";
import { auth } from "../index";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
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

export const doSetPersistence = async (persistence: Persistence) => {
  await setPersistence(auth, persistence);
}