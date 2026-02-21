import axiosInstance from "./axiosInstance";

export const loginAdmin = async (credentials) => {
  // Assuming your backend route is POST /api/admin/login
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data; // Expected to return { success: true, token: "eyJhb..." }
};
