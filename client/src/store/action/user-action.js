import { axiosInstance } from "../../api";
import {
  // sign-up
  GET_PROFILE_PROCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,

  //reset state
  RESET_AUTH,
} from "../constant/user-constant";

export function getUserProfile() {
  return async function (dispatch) {
    try {
      dispatch({ type: GET_PROFILE_PROCESS });

      const result = await axiosInstance.get("/api/user/profile");

      dispatch({ type: GET_PROFILE_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_PROFILE_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}

export function updateUserProfile(formData) {
  return async function (dispatch) {
    try {
      dispatch({ type: GET_PROFILE_PROCESS });

      const result = await axiosInstance.post("/api/auth/sign-up", {
        ...formData,
      });

      dispatch({ type: GET_PROFILE_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_PROFILE_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_AUTH });
    }
  };
}
