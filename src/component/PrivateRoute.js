import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthenticationContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // If no user is logged in, redirect to login page
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
