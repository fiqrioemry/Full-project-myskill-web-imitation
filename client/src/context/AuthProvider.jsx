/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  userSignIn,
  userSignOut,
  userSignUp,
} from "../store/action/auth-action";
import { signInFormData, signUpFormData } from "@/config";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);

  // sign-up
  async function handleSignUp(e) {
    e.preventDefault();
    dispatch(userSignUp(signUpForm));
    setSignUpForm(signUpFormData);
  }

  // sign-in
  async function handleSignIn(e) {
    e.preventDefault();
    dispatch(userSignIn(signInForm));
    setSignInForm(signInFormData);
  }

  // sign-out
  async function handleSignOut() {
    dispatch(userSignOut());
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
