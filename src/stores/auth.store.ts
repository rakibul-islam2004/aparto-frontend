import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  handleOAuthCallback: (accessToken: string, refreshToken: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true });
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      },

      setUser: (user) => set({ user }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await authService.login({ email, password });
          get().setTokens(data.accessToken, data.refreshToken);
          get().setUser(data.user);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email, password, name, phone) => {
        set({ isLoading: true });
        try {
          const data = await authService.register({ email, password, name, phone });
          get().setTokens(data.accessToken, data.refreshToken);
          get().setUser(data.user);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const refreshToken = get().refreshToken;
        if (refreshToken) {
          try {
            await authService.logout(refreshToken);
          } catch {
            // ignore logout errors
          }
        }
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      },

      refreshTokens: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return;
        try {
          const data = await authService.refresh(refreshToken);
          get().setTokens(data.accessToken, data.refreshToken);
        } catch {
          get().logout();
        }
      },

      handleOAuthCallback: async (accessToken, refreshToken) => {
        get().setTokens(accessToken, refreshToken);
        // Fetch user data after OAuth login
        try {
          const user = await authService.getMe();
          get().setUser(user);
        } catch (error) {
          console.error('Failed to fetch user after OAuth:', error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
