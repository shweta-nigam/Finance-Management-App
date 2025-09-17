import axios from "axios";
import { useState } from "react";

export function useLogin() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (urlPath: string, data: any) => {

    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(urlPath, data);
      console.log("response---", response);
      setResponse(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      setLoading(false);
    }
  }

  return [login, response, error, loading]
}

export function useSignUp(){
  const [signingUp, setSigningUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<any>(null)

  const signup = async (urlPath:string, data:any) =>{
    try {
      setError(null)
      setSigningUp(true)
      const res = await axios.post(urlPath, data)
      setResponse(res.data)
      setSigningUp(false)
      return response.data;
    } catch (error:any) {
      setError(error.message || "Something went wrong")
      return null;
    } finally{
       setSigningUp(false)
    }
  }
  return [signup, signingUp, error, response]
}