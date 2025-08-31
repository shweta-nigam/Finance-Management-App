import { LoginPage } from "@/pages/LoginPage";
import { Route } from "react-router-dom";

export function AuthRoute() {
  return (
    <>

        <Route path="/login/*" element={<LoginPage />} />
    
    </>
  );
}
