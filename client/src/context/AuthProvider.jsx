/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../hooks/toastMessage";
import { signInFormData, signUpFormData } from "@/config";
import { createContext, useContext, useState } from "react";
import { userSignIn, userSignOut, userSignUp } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);
  const [loading, setLoading] = useState(false);

  // sign-up
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    const result = await userSignUp(signUpForm);

    setLoading(false);
    toastMessage(result.success, result.message);
    if (result.success) {
      navigate("/sign-in");
    } else {
      setSignUpForm(signUpFormData);
    }
  }

  // sign-in
  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);

    const result = await userSignIn(signInForm);

    setLoading(false);
    toastMessage(result.success, result.message);
    if (result.success && result.data) {
      Cookies.set("accessToken", result.data.accessToken, {
        expires: 1 / 24,
      });
      Cookies.set("user", JSON.stringify(result.data.user));
      navigate("/");
    } else {
      setSignInForm(signInFormData);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    const result = await userSignOut();
    Cookies.remove("user");
    Cookies.remove("accessToken");
    toastMessage(result.succes, result.message);
    setLoading(false);
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

export const useAuth = () => {
  return useContext(AuthContext);
};
