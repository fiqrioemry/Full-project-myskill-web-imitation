import { createContext, useContext, useState } from "react";
import { signUpFormData } from "../config";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signUpForm, setSignUpForm] = useState(signUpFormData);

  async function handleSignUp(e) {
    e.preventDefault();
    console.log("user sign up");
  }

  async function handleSignIn(e) {
    e.preventDefault();
    console.log("user sign up");
  }

  async function handleSignOut(e) {
    e.preventDefault();
    console.log("user sign up");
  }
  return (
    <AuthContext.Provider
      value={
        (handleSignIn, handleSignOut, handleSignUp, signUpForm, setSignUpForm)
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
