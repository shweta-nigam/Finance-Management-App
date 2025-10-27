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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/context/AuthContext.tsx";
import { GoogleLogin } from "@react-oauth/google";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loginWithGoogle, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="bg flex flex-col items-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            <p>
              First time here?
              <Link
                to="/signup"
                className="ml-2 inline-block text-sm underline-offset-4 hover:underline text-blue-800 "
              >
                Signup
              </Link>
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
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            {error && <p className="text-red-500"> Error: {error}</p>}
            {!error && loading && (
              <p className="text-gray-500 mt-2">Logging in...</p>
            )}

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (!credentialResponse.credential) return;
                  await loginWithGoogle(credentialResponse.credential);
                  navigate("/");
                }}
                onError={() => console.error("Google Login Failed")}
              /> */}
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    if (!credentialResponse?.credential) return;

                    console.log("Google credential response:", credentialResponse);
                    
                    await loginWithGoogle(credentialResponse.credential);
                    navigate("/");
                  } catch (err) {
                    console.error("Google Login failed:", err);
                  }
                }}
                onError={() => console.error("Google Login Failed")}
                useOneTap={false}
                type="standard"
                theme="outline"
                shape="rectangular"
                text="signin_with"
                size="large"
                width="300"
                ux_mode="popup"
              />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
