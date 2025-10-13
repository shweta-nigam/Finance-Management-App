import axios from "axios";
import { useState } from "react";
import type { User } from "@/types"; 

export function useAuthApi() {
  const [response, setResponse] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (urlPath: string, data: any): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.post(urlPath, data);
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
      const res = await axios.post(urlPath, data); 
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
      const res = await axios.post(urlPath, data);
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
      const res = await axios.get(urlPath);
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
      const res = await axios.post(urlPath);
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

  return {
    response,
    error,
    loading,
    register,
    verifyUser,
    login,
    getCurrentUser,
    logout,
  };
}


// import axios from "axios";
// import { useState } from "react";

// export function useAuthApi(){

// }

// export function useLogin() {
//   const [response, setResponse] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const login = async (urlPath: string, data: any) => {

//     try {
//       setError(null);
//       setLoading(true);
//       const response = await axios.post(urlPath, data);
//       // console.log("response---", response);
//       setResponse(response.data);
//       setLoading(false);

//       return response.data
//     } catch (error: any) {
//       setError(error.message || "Something went wrong");
//       setLoading(false);
//       throw error
//     }
//   }

//   return [login, response, error, loading] as const
// }

// export function useSignUp() {
//   const [signingUp, setSigningUp] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [response, setResponse] = useState<any>(null)

//   const signup = async (urlPath: string, data: any) => {
//     try {
//       setError(null)
//       setSigningUp(true)
//       const res = await axios.post(urlPath, data)
//       setResponse(res.data)
//       setSigningUp(false)
//       return response.data;
//     } catch (error: any) {
//       setError(error.message || "Something went wrong")
//       return null;
//     } finally {
//       setSigningUp(false)
//     }
//   }
//   return [signup, signingUp, error, response]
// }