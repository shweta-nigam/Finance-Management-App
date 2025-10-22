import useAuth from "@/context/AuthContext";
import useBudget from "@/context/BudgetContext";
import useExpense from "@/context/ExpenseContext";
import {
  User,
  Wallet,
  BarChart,
  Target,
  Settings,
  BarChart3,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { Lock } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

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
    id: "expense",
    label: "expense",
    icon: <Wallet size={18} />,
    path: "/dashboard/expense",
  },
  {
    id: "income",
    label: "Income",
    icon: <BarChart size={18} />,
    path: "/dashboard/income",
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
  const { user } = useAuth();
  const { activeBudget } = useBudget();
  const { expenses } = useExpense();

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg text-white space-y-4">
        <p className="text-xl">Please log in to view your profile</p>
        <Lock className="w-10 h-10 text-red-400 animate-bounce" />
      </div>
    );
  }

  const calBalance = () => {
    const totalBudget = activeBudget?.amount || 0;
    const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const totalBalance = totalBudget - totalExpense;
    return totalBalance;
  };

  return (
    <>
      {/* hero section */}
      <div className="flex h-auto bg">
        {/* sidebar */}
        <div className="w-64 bg text-white flex flex-col p-4">
          <div className="mb-6 text-center flex flex-col items-center">
            <UserAvatar size="w-12 h-12 text-lg" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-300">{calBalance()}</p>
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
