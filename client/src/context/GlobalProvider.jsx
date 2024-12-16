import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <GlobalContext.Provider value={{ user, loading, currentPath }}>
      {children}
      <Toaster />
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  return useContext(GlobalContext);
};
