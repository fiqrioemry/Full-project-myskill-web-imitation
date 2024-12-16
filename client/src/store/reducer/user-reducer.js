import { toastMessage } from "../../hooks/toastMessage";
import {
  //get profile
  GET_PROFILE_PROCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESS,

  //update profile
  UPDATE_PROFILE_PROCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,

  // reset
  RESET_PROFILE,
} from "../constant/user-constant";

const initialState = {
  profile: null,
  loading: false,
  success: false,
  message: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // * GET USER PROFILE ------------------------------------------------------------
    case GET_PROFILE_PROCESS:
      return { ...state };

    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload.data,
      };
    }

    case GET_PROFILE_FAILED:
      return {
        ...state,
      };

    // * UPDATE USER PROFILE ------------------------------------------------------------
    case UPDATE_PROFILE_PROCESS:
      return { ...state, loading: true };

    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload.data,
        success: action.payload.success,
        message: action.payload.message,
      };
    }

    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };

    case RESET_PROFILE:
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
