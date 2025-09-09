import { Route } from "react-router-dom";
import Profile from "@/pages/dashboard/Profile";
import Dashboard from "@/pages/dashboard/DashBoard";

export default function DashboardRoutes() {
  return (
    <>
      <Route path="/dashboard" element={<Dashboard />}>  {/*Absolute path */}
        <Route path="profile" element={<Profile />} />      {/*relative path */}
      </Route>
    </>
  );
}
