import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState(false);
  //   const user = sessionStorage.getItem("user") || null;
  const handleSignIn = () => {
    setUser(true);
  };

  const handleSignOut = () => {
    setUser(false);
  };

  return (
    <GlobalContext.Provider
      value={{ user, handleSignIn, handleSignOut, currentPath }}
    >
      {children}
      <ToastContainer limit={2} />
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  return useContext(GlobalContext);
};
