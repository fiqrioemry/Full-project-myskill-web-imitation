import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const result = await axiosInstance.post("/api/auth/refresh");
        const { accessToken, user } = result.data;

        Cookies.set("accessToken", accessToken, { expires: 1 / 24 });
        localStorage.setItem("user", JSON.stringify(user));

        // Ulangi permintaan dengan token baru
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance.request(error.config);
      } catch (errorRefresh) {
        console.error("Refresh token failed:", errorRefresh.message);
        window.location.href = "/sign-in";
      }
    }
    // Untuk error lain, tetap reject
    return Promise.reject(error);
  }
);
