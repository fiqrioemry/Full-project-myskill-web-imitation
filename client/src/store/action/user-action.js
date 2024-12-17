import { axiosInstance } from "../../api";
import {
  // get profile
  GET_PROFILE_PROCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,

  // update profile
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,

  //reset state
  RESET_PROFILE,
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
      dispatch({ type: RESET_PROFILE });
    }
  };
}

export function updateUserProfile(formData) {
  return async function (dispatch) {
    try {
      const result = await axiosInstance.put("/api/user/profile/update", {
        ...formData,
      });
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILED, payload: error.response.data });
    } finally {
      dispatch({ type: RESET_PROFILE });
    }
  };
}
