import axios from "axios";
import Cookies from "js-cookie";

// Buat Axios Instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken") || null;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         const result = await axiosInstance.post("/api/auth/refresh");
//         const { accessToken, user } = result.data.data;

//         localStorage.setItem("user", JSON.stringify(user));
//         Cookies.set("accessToken", accessToken, {
//           expires: 1 / 24, // 1 jam
//         });
//       } catch (refreshError) {
//         localStorage.removeItem("user");
//         Cookies.remove("accessToken");
//         console.error("Refresh token failed:", refreshError.message);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
