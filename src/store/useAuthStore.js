import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Initialize state directly from local storage
  token: localStorage.getItem("adminToken") || null,
  isAuthenticated: !!localStorage.getItem("adminToken"),

  login: (token) => {
    localStorage.setItem("adminToken", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ token: null, isAuthenticated: false });
  },
}));
