import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuthApi } from "@/hooks/useAuthApi";
import type { User } from "@/types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (data: Record<string, any>) => Promise<void>;
  verifyUser: (token: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { loading, error, login, register, verifyUser, logout } = useAuthApi();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    const user = await login("/api/v1/auth/login", { email, password });
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const registerUser = async (data: Record<string, any>) => {
    try {
      const newUser = await register("/api/v1/auth/register", data);
      if (newUser) {
        console.log("Registration successful. Please verify your email.");
      }
    } catch (err: any) {
      throw err;
    }
  };

  const verifyUserHandler = async (token: string) => {
    const verifiedUser = await verifyUser(`/api/v1/auth/verify/${token}`, {});
    if (verifiedUser) {
      setUser(verifiedUser);
      localStorage.setItem("user", JSON.stringify(verifiedUser));
    }
  };

  const logoutUser = async () => {
    await logout("/api/v1/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginUser,
        registerUser,
        verifyUser: verifyUserHandler,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
