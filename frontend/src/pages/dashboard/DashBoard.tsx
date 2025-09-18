import { User, Wallet, BarChart, Target, Settings, BarChart3 } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const menuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: <User size={18} />,
    path: "/dashboard/profile",
  },
  {
    id: "overview",
    label: "Overview",
    icon: <BarChart3 size={18} />,
    path: "/dashboard/overview",
  },
  {
    id: "budget",
    label: "Budget",
    icon: <Wallet size={18} />,
    path: "/dashboard/budget",
  },
  {
    id: "report",
    label: "Report",
    icon: <BarChart size={18} />,
    path: "/dashboard/report",
  },
  {
    id: "goal",
    label: "Goal",
    icon: <Target size={18} />,
    path: "/dashboard/goal",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={18} />,
    path: "/dashboard/settings",
  },
];

export default function Dashboard() {
  return (
    <>
      {/* hero section */}
      <div className="flex h-auto bg">
        {/* sidebar */}
        <div className="w-64 bg text-white flex flex-col p-4">
          <div className="mb-6 text-center">
            <img
              src="https://i.pravatar.cc/100"
              alt="user avatar"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-300">Balance: ₹45,200</p>
          </div>
          {/* navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-indigo-500"
                  >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/*Content Area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
