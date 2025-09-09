import { Home, Wallet, BarChart, Target, Settings } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { id: "profile", label: "profile", icon: <Home size={18} /> },
  { id: "budgets", label: "Budgets", icon: <Wallet size={18} /> },
  { id: "reports", label: "Reports", icon: <BarChart size={18} /> },
  { id: "goals", label: "Goals", icon: <Target size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>();
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
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-indigo-600"
                        : "hover:bg-indigo-500"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "user-info" && (
            <h1 className="text-2xl font-bold">📊 User info Overview</h1>
          )}
          {activeTab === "budgets" && (
            <h1 className="text-2xl font-bold">💰 Manage Budgets</h1>
          )}
          {activeTab === "reports" && (
            <h1 className="text-2xl font-bold">📈 Reports & Analytics</h1>
          )}
          {activeTab === "goals" && (
            <h1 className="text-2xl font-bold">🎯 Savings Goals</h1>
          )}
          {activeTab === "settings" && (
            <h1 className="text-2xl font-bold">⚙️ Settings</h1>
          )}
        </div>
      </div>
    </>
  );
}
