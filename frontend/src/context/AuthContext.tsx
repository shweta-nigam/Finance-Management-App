import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null; // holds current user otherwise null
  login: (user: User) => void; // a function , takes param of type User, returns noting.
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
); // undefined used to make sure to never accidentally use context without a provider.

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

//notes:-
// export function AuthProvider({children} : {children: REactNode}) ---- means "children can be anything that React is able to render.
// localStorage.setItem("user", JSON.stringify(userData)); ---
// ---- localStorage is a browser storage API that survives refreshes. whereas useState does not.
// --- Why JSON.stringify?
// --- localStorage only stores strings.
// ----So if your user is an object, you must serialize it:

// every context gives 2 things:
// 1. AuthContext → the context object.
// 2. AuthContext.Provider → the special component that supplies the value.
// <AuthContext.Provider value={{ user, login, logout }}
// --- Consumers can access them via useAuth().

// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import type { ReactNode } from "react";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// };

// type AuthContextType = {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   // persist login (optional: check localStorage or API token)
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (user: User) => {
//     setUser(user);
//     localStorage.setItem("user", JSON.stringify(user));
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

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// }
