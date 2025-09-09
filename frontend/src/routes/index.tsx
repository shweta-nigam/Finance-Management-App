import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoute } from "./authRoutes";
import HomePage from "@/pages/HomePage";
import DashboardRoutes from "./dashboardRoutes";
import NotFoundPage from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {AuthRoute()}
        {DashboardRoutes()}
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  );
}
