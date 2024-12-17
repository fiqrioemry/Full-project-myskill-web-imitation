import { axiosInstance } from "../../api";
import {
  // sign-up
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  // sign-in
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  //sign-out
  LOGOUT_PROCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  // refresh
  REFRESH_SUCCESS,
  REFRESH_FAILED,
  REFRESH_PROCESS,

  //reset state
  RESET_AUTH,
} from "../constant/auth-constant";

// user sign-up
export function userSignUp(formData) {
  return async function (dispatch) {
    try {
      dispatch({ type: REGISTER_PROCESS });

      const result = await axiosInstance.post("/api/auth/sign-up", {
        ...formData,
      });

      dispatch({ type: REGISTER_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}

// user sign-in
export function userSignIn(formData) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_PROCESS });

      const result = await axiosInstance.post("/api/auth/sign-in", {
        ...formData,
      });

      dispatch({ type: LOGIN_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}

// user sign-out
export function userSignOut() {
  return async function (dispatch) {
    try {
      dispatch({ type: LOGOUT_PROCESS });

      const result = await axiosInstance.get("/api/auth/sign-out");

      dispatch({ type: LOGOUT_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}

// refresh token
export function userRefresh() {
  return async function (dispatch) {
    try {
      dispatch({ type: REFRESH_PROCESS });
      const result = await axiosInstance.post("/api/auth/refresh");
      dispatch({ type: REFRESH_SUCCESS, payload: result.data.data });
    } catch (error) {
      dispatch({ type: REFRESH_FAILED, payload: error.response });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}
