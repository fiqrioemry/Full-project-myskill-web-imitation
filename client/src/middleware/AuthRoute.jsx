import { Fragment } from "react";
import { useGlobal } from "../context/GlobalProvider";
import { Navigate } from "react-router-dom";
import { authPath, nonAuthPath, prohibitPath } from "../config";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { userRefresh } from "../store/action/auth-action";
// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, currentPath } = useGlobal();
  const accessToken = Cookies.get("accessToken") || null;
  const {loading} 

  if (!accessToken) {
    console.log("masuk");
    dispatch(userRefresh());
  }

  if (user && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

  if (!user && authPath.includes(currentPath))
    return <Navigate to="/sign-in" />;

  if (user && user.userRole !== "admin" && prohibitPath.includes(currentPath))
    return <Navigate to="*" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
