import { Route } from "react-router-dom";
import Profile from "@/pages/dashboard/Profile";
import Dashboard from "@/pages/dashboard/DashBoard";
import BudgetPage from "@/pages/dashboard/Budget";
import Overview from "@/pages/dashboard/Overview";
import Report from "@/pages/dashboard/Report";
import Goal from "@/pages/dashboard/Goal";
import Settings from "@/pages/dashboard/Settings";
import Expense from "@/pages/dashboard/Expense";
import { DashboardProvider } from "@/context/DashboardProvider";
import Income from "@/pages/dashboard/Income";

export default function DashboardRoutes() {
  return (
    <>
      <Route
        path="/dashboard"
        element={
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        }
      >
        {/*Absolute path */}
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} /> {/*relative path */}
        <Route path="budget" element={<BudgetPage />} />
        <Route path="overview" element={<Overview />} />
        <Route path="expense" element={<Expense />} />
        <Route path="report" element={<Report />} />
        <Route path="goal" element={<Goal />} />
        <Route path="settings" element={<Settings />} />
        <Route path="income" element={<Income />} />
      </Route>
    </>
  );
}
