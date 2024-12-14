import { Fragment } from "react";
import { useGlobal } from "../context/GlobalProvider";
import { Navigate } from "react-router-dom";
import { authPath, nonAuthPath, prohibitPath } from "../config";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { user, currentPath } = useGlobal();

  if (user && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

  if (!user && authPath.includes(currentPath))
    return <Navigate to="/sign-in" />;

  if (user && user.userRole !== "admin" && prohibitPath.includes(currentPath))
    return <Navigate to="*" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
