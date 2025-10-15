"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download } from "lucide-react";
import useBudget from "@/context/BudgetContext";
import useExpense from "@/context/ExpenseContext";
import useCategory from "@/context/CategoryContext";

const COLORS = ["#16a34a", "#dc2626", "#3b82f6", "#8b5cf6", "#f59e0b"];

export default function Report() {
  const [view, setView] = useState<"month" | "year" | "custom">("month");

  const { budgets } = useBudget();
  const { expenses } = useExpense();
  const { categories } = useCategory();

  // --- Calculate Totals ---
  const totalIncome = useMemo(
    () =>
      budgets.reduce((sum, b) => {
        const category = categories.find((c) => c.id === b.categoryId);
        return category?.type === "Income" ? sum + Number(b.amount || 0) : sum;
      }, 0),
    [budgets, categories]
  );

  const totalExpenses = useMemo(
    () =>
      expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  const savings = totalIncome - totalExpenses;

  // --- Spending by Category ---
  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const category = categories.find((c) => c.id === e.categoryId);
      if (!category) return;
      map[category.title] = (map[category.title] || 0) + Number(e.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses, categories]);

  // --- Chart Data ---
  const lineChartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((e) => {
      if (!e.date) return;
      const date = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      grouped[date] = (grouped[date] || 0) + Number(e.amount);
    });
    return Object.entries(grouped).map(([date, value]) => ({ date, value }));
  }, [expenses]);

  // --- Handle Export (placeholder) ---
  const handleExport = (type: "pdf" | "excel") => {
    console.log(`Exporting report as ${type}...`);
    // Future: integrate real export logic here
  };

  // --- Cards data ---
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
      title: "Savings",
      value: `₹${savings.toLocaleString()}`,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="p-6 space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "year" | "custom")}
          className="bg-D-blue border border-gray-700 rounded-md px-4 py-2 text-sm focus:outline-none"
        >
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-D-blue shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">{card.title}</h2>
                <p className={`text-3xl font-semibold ${card.color}`}>
                  {card.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <Card className="bg-D-blue shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data to display
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-D-blue shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            {categoryTotals.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {categoryTotals.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No expense data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-D-blue shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Detailed Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300">
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                expenses.slice(-10).reverse().map((e) => {
                  const category = categories.find(
                    (c) => c.id === e.categoryId
                  );
                  return (
                    <tr
                      key={e.id}
                      className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                    >
                      <td className="p-2 text-gray-300">
                        {new Date(e.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">{category?.title || "Uncategorized"}</td>
                      <td className="p-2 text-sm text-gray-400">
                        {category?.type || "-"}
                      </td>
                      <td
                        className={`p-2 font-semibold ${
                          category?.type === "Income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {category?.type === "Income" ? "+" : "-"}₹{e.amount}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => handleExport("pdf")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button
          onClick={() => handleExport("excel")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>
    </div>
  );
}

