import { createContext, useContext, useState } from "react";
import { signInFormData, signUpFormData } from "@/config";

import { toast } from "react-toastify";
import { userSignUp } from "../services";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);

    const data = await userSignUp(signUpForm);
    console.log(data);
    if (data.success) {
      toast.success(data.message);
      setLoading(false);
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    console.log("signin");
  }

  async function handleSignOut(e) {
    e.preventDefault();
    console.log("signout");
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
