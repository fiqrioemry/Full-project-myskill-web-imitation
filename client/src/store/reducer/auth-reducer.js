import { toastMessage } from "../../hooks/toastMessage";
import {
  //sign-up
  REGISTER_PROCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,

  //sign-in
  LOGIN_PROCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,

  //sign-out
  LOGOUT_PROCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  RESET_AUTH,
} from "../constant/auth-constant";

import Cookies from "js-cookie";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  success: false,
  message: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // * SIGN-UP ------------------------------------------------------------
    case REGISTER_PROCESS:
      return { ...state, loading: true };

    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: null,
        success: action.payload.success,
        message: action.payload.message,
      };
    }

    case REGISTER_FAILED:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };

    // * SIGN-IN ------------------------------------------------------------
    case LOGIN_PROCESS:
      return { ...state, loading: true };

    case LOGIN_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      Cookies.set("accessToken", action.payload.data.accessToken, {
        expires: 1 / 24,
      });
      return {
        ...state,
        user: action.payload.data.user,
        success: action.payload.success,
        message: action.payload.message,
      };
    }

    case LOGIN_FAILED:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };

    // * SIGN-OUT ------------------------------------------------------------
    case LOGOUT_PROCESS:
      return { ...state, loading: true };

    case LOGOUT_SUCCESS: {
      localStorage.removeItem("user");
      Cookies.remove("accessToken");
      return {
        ...state,
        user: null,
        success: action.payload.success,
        message: action.payload.message,
      };
    }

    case LOGOUT_FAILED:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };

    case RESET_AUTH:
      toastMessage(state.success, state.message);
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
      };

    default:
      return state;
  }
};
