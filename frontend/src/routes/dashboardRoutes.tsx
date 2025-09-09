import { Route } from "react-router-dom";
import Profile from "@/pages/dashboard/Profile";
import Dashboard from "@/pages/dashboard/DashBoard";
import BudgetPage from "@/pages/dashboard/Budget";

export default function DashboardRoutes() {
  return (
    <>
      <Route path="/dashboard" element={<Dashboard />}> {/*Absolute path */}
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} /> {/*relative path */}
        <Route path="budgets" element={<BudgetPage />} />
      </Route>
    </>
  );
}
