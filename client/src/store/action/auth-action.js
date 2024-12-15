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

  //reset state
  RESET_AUTH,
} from "../constant/auth-constant";

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