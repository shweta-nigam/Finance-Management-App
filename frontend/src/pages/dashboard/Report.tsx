import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { calculateTotals, getChartData } from "@/utils/financeCalculations";
import useBudget from "@/context/BudgetContext";
import useExpense from "@/context/ExpenseContext";

export default function Report() {
  const { budgets } = useBudget();
  const { expenses } = useExpense();

  const { totalIncome, totalExpenses, totalBudget, totalBalance, utilization } =
    useMemo(
      () => calculateTotals(budgets, expenses, budgets),
      [budgets, expenses]
    );

  const lineChartData = useMemo(
    () => getChartData(budgets, expenses),
    [budgets, expenses]
  );

  const categoryTotals = useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((e) => {
      const category = e.category || "Others";
      grouped[category] = (grouped[category] || 0) + Number(e.amount || 0);
    });
    return Object.entries(grouped).map(([category, value]) => ({
      name: category,
      value,
    }));
  }, [expenses]);

  // --- Summary Cards ---
  const summaryCards = [
    {
      title: "Total Income",
      value: `₹${totalIncome.toLocaleString()}`,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      color: "text-red-500",
    },
    {
      title: "Savings (Balance)",
      value: `₹${totalBalance.toLocaleString()}`,
      color: "text-blue-500",
    },
    {
      title: "Utilization",
      value: `${utilization}%`,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-D-Blue">
      <h1 className="text-3xl font-bold mb-6">Financial Report</h1>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl"
          >
            <CardContent className="p-4 text-center">
              <p className="text-gray-300">{card.title}</p>
              <p className={`text-2xl font-semibold ${card.color}`}>
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Expense Breakdown (Pie Chart) --- */}
        <Card className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Expense Breakdown by Category
            </h2>
            {categoryTotals.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${index * 40}, 80%, 60%)`}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400">
                No expense data available
              </p>
            )}
          </CardContent>
        </Card>

        {/* --- Income vs Expense Trend (Line Chart) --- */}
        <Card className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Income vs Expense Trend
            </h2>
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#00C49F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#FF8042"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400">
                No transaction data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
