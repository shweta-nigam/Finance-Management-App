"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import useBudget from "@/context/BudgetContext";
import useExpense from "@/context/ExpenseContext";
import useCategory from "@/context/CategoryContext";
import { useExpenseApi } from "@/hooks/useExpenseApi";

export default function Overview() {
  const { budgets, loading: budgetLoading } = useBudget();
  const { expenses} = useExpense();
  const {loading: expenseLoading} = useExpenseApi()
  const { categories } = useCategory();

  // Build category lookup map for faster access
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      if (c.id && c.type) map[c.id] = c.type;
    });
    return map;
  }, [categories]);

  // ---- Compute Totals ----
  const totalIncome = useMemo(() => {
    return budgets
      .filter((b) => categoryMap[b.categoryId] === "Income")
      .reduce((sum, b) => sum + Number(b.amount || 0), 0);
  }, [budgets, categoryMap]);

  const totalExpenses = useMemo(() => {
    return (expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  const savings = totalIncome - totalExpenses;

  // ---- Chart Data ----
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenses.forEach((e) => {
      if (!e.date) return;
      const date = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      grouped[date] = (grouped[date] || 0) + Number(e.amount);
    });

    budgets.forEach((b) => {
      if (!b.date) return;
      const date = new Date(b.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      grouped[date] = (grouped[date] || 0) + Number(b.amount);
    });

    return Object.entries(grouped).map(([date, total]) => ({ date, total }));
  }, [budgets, expenses]);

  // ---- Summary Cards ----
  const summaryCards = [
    {
      title: "Total Income",
      value: `₹${totalIncome.toLocaleString()}`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Savings",
      value: `₹${savings.toLocaleString()}`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Transactions",
      value: `${expenses.length}`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  if (budgetLoading || expenseLoading) {
    return <p className="p-6">Loading Overview...</p>;
  }

  return (
    <div className="p-6 space-y-10">
      {/* ---- Summary Section ---- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`${card.bg} shadow-sm`}>
              <CardHeader>
                <CardTitle className={`text-sm font-medium ${card.color}`}>
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-semibold ${card.color}`}>
                  {card.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ---- Combined Chart ---- */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Income & Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ---- Recent Expenses ---- */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses.length === 0 ? (
            <p className="text-gray-500">No recent expenses.</p>
          ) : (
            expenses.slice(-5).reverse().map((expense) => {
              const category = categories.find((c) => c.id === expense.categoryId);
              return (
                <div
                  key={expense.id}
                  className="flex justify-between items-center border-b pb-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-gray-500 text-xs">
                      {category ? category.title : "Uncategorized"} •{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">₹{expense.amount}</p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}

