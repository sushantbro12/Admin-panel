import { createContext } from "react";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authValue = { createUser };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
