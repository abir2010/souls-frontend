import axios from "axios";
// Import Auth Store to trigger the logout state
import { useAuthStore } from "../store/useAuthStore";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Abort if backend takes longer than 10 seconds
});

// Intercept requests to attach the Admin JWT token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercept responses to catch 401 Unauthorized errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, let it pass through normally
    return response;
  },
  (error) => {
    // If the backend rejects the request because the token is expired/invalid
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out admin.");

      // Manually wipe the token from the browser's storage
      localStorage.removeItem("adminToken");

      // Wipe the Zustand state to update the UI
      useAuthStore.getState().logout();

      // Force redirect the user back to the login page
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
