import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "./authRoutes";
import HomePage from "@/pages/HomePage";
import DashboardRoutes from "./dashboardRoutes";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/AboutPage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {AuthRoute()}
        {DashboardRoutes()}
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  );
}
