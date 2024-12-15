import axios from "axios";
import Cookies from "js-cookie";

// Buat Axios Instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response, // Jika respons sukses, langsung kembalikan
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const result = await axiosInstance.post("/api/auth/refresh");

        const { accessToken, user } = result.data.data;

        Cookies.set("accessToken", accessToken, {
          expires: 1 / 24,
        });
        localStorage.setItem("user", JSON.stringify(user));

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError.message);

        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
