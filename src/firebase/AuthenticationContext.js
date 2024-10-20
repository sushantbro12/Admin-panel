// src/AuthProvider.js
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const saveUserDetails = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName || "Anonymous",
        role: "Customer", // Default role
        status: "Active", // Default status
      },
      { merge: true }
    );
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        saveUserDetails(userCredential.user);
      }
    );
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((userCredential) => {
      saveUserDetails(userCredential.user);
    });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    currentUser,
    createUser,
    googleSignIn,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
