import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "./authRoutes";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/auth/DashBoard";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        {AuthRoute()}
      </Routes>
    </>
  );
}
