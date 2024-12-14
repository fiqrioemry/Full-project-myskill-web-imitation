import { axiosInstance } from "../api";

export async function userSignUp(formData) {
  const { data } = await axiosInstance.post("/api/auth/sign-up", {
    ...formData,
    role: "student",
  });

  return data;
}

// export async function userSignIn(formData) {
//   try {
//     const response = await axiosInstance.post("/api/auth/sign-in", {
//       formData,
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// }
