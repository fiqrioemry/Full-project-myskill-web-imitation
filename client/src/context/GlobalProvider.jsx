import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = Cookies.get("user") || null;

  console.log(user);

  return (
    <GlobalContext.Provider value={{ user, currentPath }}>
      {children}
      <Toaster />
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  return useContext(GlobalContext);
};
