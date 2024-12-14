import { createContext, useContext, useState } from "react";
import { signInFormData, signUpFormData } from "../config";
import { userSignUp } from "../services";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [signUpForm, setSignUpForm] = useState(signUpFormData);
  const [signInForm, setSignInForm] = useState(signInFormData);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    const data = await userSignUp(signUpFormData);
    console.log(data);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(false);
    const result = await userSignUp(signUpForm);
    console.log(result);
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
