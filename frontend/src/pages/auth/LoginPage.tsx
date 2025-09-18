import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLogin } from "../../hooks/useAuth.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/context/AuthContext.tsx";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, response, error, loading] = useLogin();
  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login("/api/v1/auth/login", { email, password });

    const user = res?.data?.user;
    const token = res?.data?.accessToken;

    if (user && token) {
      setAuthUser({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        avatar: res.user.avatar || "/profile.jpg",
      });

      localStorage.setItem("token", res.accessToken);
      navigate("/");
    }
  };

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="bg flex flex-col items-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            <p>
              First time here?
              <a
                className="ml-2 inline-block text-sm underline-offset-4 hover:underline text-blue-800 "
                href="http://localhost:5173/signup"
              >
                Signup
              </a>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    console.log("typed", e.target.value);
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            {response?.success && (
              <p className="text-green-600"> Login successful</p>
            )}
            {error && <p className="text-red-500"> Error: {error}</p>}

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
