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

export async function userSignIn(formData) {
  try {
    const { data } = await axiosInstance.post("/api/auth/sign-in", {
      ...formData,
    });

    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function userSignOut() {
  const result = await axiosInstance.get("/api/auth/sign-out");
  return result;
}
