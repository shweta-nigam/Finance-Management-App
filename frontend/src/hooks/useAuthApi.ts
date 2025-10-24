import { useState } from "react";
import type { User } from "@/types";
import api from "@/axios/api";

export function useAuthApi() {
  const [response, setResponse] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (urlPath: string, data: any): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.post(urlPath, data);
      const user: User = res.data.data.user;
      setResponse(user);
      return user;
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong while signing up"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (urlPath: string, data: any): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.post(urlPath, data);
      const user: User = res.data.data.user;
      setResponse(user);
      return user;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Something went wrong while verifying user"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (urlPath: string, data: any): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.post(urlPath, data);
      const user: User = res.data.data.user;
      setResponse(user);
      return user;
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong while logging in"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get current logged-in user (from token/session)
  const getCurrentUser = async (urlPath: string): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.get(urlPath);
      const user: User = res.data.data.user;
      setResponse(user);
      return user;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Something went wrong while fetching current user"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (urlPath: string): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.post(urlPath);
      setResponse(null);
      return res.data.success || true;
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong while logging out"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken: string): Promise<User> => {
    try {
      setError(null)
      setLoading(false)

      const res = api.post("/api/v1/auth/google", { idToken }, { withCredentials: true })

      const user: User = (await res).data.data.user
      setResponse(user)
      return user
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong with Google login")
      throw error;
    } finally {
      setLoading(false)
    }
  }

  return {
    response,
    error,
    loading,
    register,
    verifyUser,
    login,
    getCurrentUser,
    logout,
    googleLogin
  };
}
