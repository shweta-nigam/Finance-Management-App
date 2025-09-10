import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "./authRoutes";
import HomePage from "@/pages/HomePage";
import DashboardRoutes from "./dashboardRoutes";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PricePage from "@/pages/PricePage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/price" element={<PricePage />} />
        {AuthRoute()}
        {DashboardRoutes()}
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  );
}
