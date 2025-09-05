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
    } finally {
      setLoading(false);
    }
  }

  return [login, response, error, loading]
}
