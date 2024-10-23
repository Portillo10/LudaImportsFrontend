import { create } from "zustand";
import { saveToken, getToken, removeToken } from "../utils/tokenHelper";

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  login: async (token) => {
    saveToken(token);
    set({ isAuthenticated: true });
  },

  logout: () => {
    removeToken();
    set({ isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = getToken();
    if (token) {
      set({ isAuthenticated: true });
    }
  },
}));
