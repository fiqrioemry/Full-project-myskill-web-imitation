/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  userRefresh,
  userSignIn,
  userSignOut,
  userSignUp,
} from "../store/action/auth-action";

import Cookies from "js-cookie";
import { signInFormData, signUpFormData } from "@/config";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);
  const { user, isAuthenticate, loading } = useSelector((state) => state.auth);
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

  // refresh token
  useEffect(() => {
    dispatch(userRefresh());
  }, [dispatch, accessToken]);

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
        isAuthenticate,
        user,
        loading,
      }}
    >
      {user === null ? null : children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
