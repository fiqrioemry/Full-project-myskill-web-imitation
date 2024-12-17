import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useGlobal } from "../context/GlobalProvider";
import { authPath, nonAuthPath, prohibitPath } from "../config";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { currentPath } = useGlobal();
  const { user, isAuthenticate } = useAuth();

  if (isAuthenticate && nonAuthPath.includes(currentPath))
    return <Navigate to="/" />;

  if (!isAuthenticate && authPath.includes(currentPath))
    return <Navigate to="/sign-in" />;

  if (
    isAuthenticate &&
    user?.userRole !== "admin" &&
    prohibitPath.includes(currentPath)
  )
    return <Navigate to="*" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
