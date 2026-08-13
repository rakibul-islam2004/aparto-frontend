import api from "@/lib/api";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  async refresh(refreshToken: string) {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>("/auth/refresh", { refreshToken });
    return data;
  },

  async logout(refreshToken: string) {
    const { data } = await api.post("/auth/logout", { refreshToken });
    return data;
  },

  async getMe() {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },

  async requestEmailVerification(email: string) {
    const { data } = await api.post("/auth/request-email-verification", { email });
    return data;
  },

  async verifyEmail(token: string) {
    const { data } = await api.post("/auth/verify-email", { token });
    return data;
  },

  async requestPhoneVerification(phone: string) {
    const { data } = await api.post("/auth/request-phone-verification", { phone });
    return data;
  },

  async verifyPhone(token: string) {
    const { data } = await api.post("/auth/verify-phone", { token });
    return data;
  },

  // OAuth methods
  getGoogleAuthUrl() {
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/oauth/google`;
  },

  getFacebookAuthUrl() {
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/oauth/facebook`;
  },
};
