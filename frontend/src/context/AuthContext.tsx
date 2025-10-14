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
    const newUser = await register("/api/v1/auth/register", data);
    if (newUser) {
      console.log("Registration successful. Please verify your email.");
    }
  };

  const verifyUserHandler = async (token: string) => {
    const verifiedUser = await verifyUser("/api/v1/auth/verify", { token });
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

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// import type { User } from "@/types";

// type AuthContextType = {
//   user: User | null; // holds current user otherwise null
//   login: (user: User) => void; // a function , takes param of type User, returns noting.
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// ); // undefined used to make sure to never accidentally use context without a provider.

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(()=>{
//   const storedUser = localStorage.getItem("user");
//   if(storedUser){
//     setUser(JSON.parse(storedUser));
//   }
//   },[])

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
