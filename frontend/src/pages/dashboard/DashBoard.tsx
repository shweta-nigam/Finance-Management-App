import { User, Wallet, BarChart, Target, Settings } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const menuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: <User size={18} />,
    path: "/dashboard/profile",
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: <Wallet size={18} />,
    path: "/dashboard/budgets",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChart size={18} />,
    path: "/dashboard/reports",
  },
  {
    id: "goals",
    label: "Goals",
    icon: <Target size={18} />,
    path: "/dashboard/goals",
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
      <div className="flex h-screen bg-D-blue">
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
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
