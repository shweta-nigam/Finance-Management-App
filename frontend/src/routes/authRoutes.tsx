import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { Route } from "react-router-dom";

export function AuthRoute() {
  return (
    <>

        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignupPage />} />
    
    </>
  );
}
