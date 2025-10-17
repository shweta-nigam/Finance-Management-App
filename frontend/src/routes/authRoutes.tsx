import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import { Route } from "react-router-dom";

export function AuthRoute() {
  return (
    <>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        
    </>
  );
}
