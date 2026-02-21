import axiosInstance from "./axiosInstance";

// Fetch settings (Public/Admin depending on how your backend handles it)
export const getSettings = async () => {
  const response = await axiosInstance.get("/admin/settings");
  return response.data.data || response.data;
};

// Admin: Update settings
export const updateSettings = async (settingsData) => {
  const response = await axiosInstance.put("/admin/settings", settingsData);
  return response.data;
};
