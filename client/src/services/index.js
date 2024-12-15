import { axiosInstance } from "../api";

export async function userSignUp(formData) {
  try {
    const { data } = await axiosInstance.post("/api/auth/sign-up", {
      ...formData,
      role: "student",
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
}
