import axiosInstance from "./axiosInstance";

export const getDashboardStats = async (timeRange = "7days") => {
  // Pass the timeRange as a query parameter so your backend can filter the data
  const response = await axiosInstance.get("/admin", {
    params: { timeRange },
  });
  return response.data.data || response.data;
};
