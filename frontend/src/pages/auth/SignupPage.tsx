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
import { useSignUp } from "@/hooks/useAuthApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [signup, signingUp, error, response] = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup("/api/v1/auth/register", { name, email, password });
  };

  useEffect(() => {
    if (error) {
      let message = "Something went wrong. Please try again.";

      if (error.includes("duplicate key") || error.includes("E11000")) {
        message = "This email is already registered.";
      } else if (error.toLowerCase().includes("password")) {
        message = "Password must be at least 6 characters long.";
      } else if (error.toLowerCase().includes("validation")) {
        message = "Please check your inputs and try again.";
      }

      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      toast.success("Signed up successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [response, navigate]);

  return (
    <div className="bg flex flex-col items-center p-6">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Sing Up</CardTitle>
            <CardDescription>
              <p>
                Already have an account?
                <a
                  className="ml-2 inline-block text-sm underline-offset-4 hover:underline text-blue-800"
                  href="http://localhost:5173/login"
                >
                  login
                </a>{" "}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 text-left">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
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
                <Label htmlFor="password">Password</Label>

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
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {signingUp ? "Signing Up..." : "Signup"}
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
