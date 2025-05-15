import type { Persistence } from "firebase/auth";
import { initFirebase } from "../helpers/firebaseUtils";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  const { auth } = await initFirebase()
  const { createUserWithEmailAndPassword } = await import("firebase/auth");
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  const { auth } = await initFirebase()
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
  const { auth } = await initFirebase()
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider);
  return result
}

export const doSignOut = async () => {
  const { auth } = await initFirebase()
  return auth.signOut();
}

export const doPasswordReset = async (email: string) => {
  const { sendPasswordResetEmail } = await import("firebase/auth");
  const { auth } = await initFirebase()
  return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = async (password: string) => {
  const { updatePassword } = await import("firebase/auth");
  const { auth } = await initFirebase()
  return updatePassword(auth.currentUser!, password)
}

export const doSendEmailVerification = async () => {
  const { sendEmailVerification } = await import("firebase/auth");
  const { auth } = await initFirebase()
  return sendEmailVerification(auth.currentUser!, {
    url: `${window.location.origin}/home`
  })
}

export const doSetPersistence = async (persistence: Persistence) => {
  const { setPersistence } = await import("firebase/auth");
  const { auth } = await initFirebase()
  await setPersistence(auth, persistence);
}