import { createContext, useContext, useState } from "react";
import { signInFormData, signUpFormData } from "../config";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);
  const [loading, setLoading] = useState(false);
  async function handleSignUp(e) {
    e.preventDefault();
    console.log(signUpForm);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    console.log(signInForm);
  }

  async function handleSignOut(e) {
    e.preventDefault();
    console.log("user sign up");
  }
  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        handleSignUp,
        signUpForm,
        setSignUpForm,
        signInForm,
        loading,
        setLoading,
        setSignInForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
