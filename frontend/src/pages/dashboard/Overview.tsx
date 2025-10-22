"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import useBudget from "@/context/BudgetContext";
import useExpense from "@/context/ExpenseContext";
import useIncome from "@/context/IncomeContext"; 
import useCategory from "@/context/CategoryContext";

export default function Overview() {
  const { budgets, loading: budgetLoading } = useBudget();
  const { expenses } = useExpense();
  const { incomes } = useIncome();
  const { categories } = useCategory();

  // ---- Compute Totals ----
  const totalIncome = useMemo(() => {
    return incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  const totalBudget = useMemo(() => {
    return budgets.reduce((sum, b) => sum + Number(b.amount || 0), 0);
  }, [budgets]);

  const totalBalance = totalIncome - totalExpenses;

  const utilization = totalBudget
    ? ((totalExpenses / totalBudget) * 100).toFixed(1)
    : "0";

  // ---- Chart Data ----
  const chartData = useMemo(() => {
    const grouped: Record<string, { income: number; expense: number }> = {};

    incomes.forEach((i) => {
      if (!i.date) return;
      const date = new Date(i.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };
      grouped[date].income += Number(i.amount);
    });

    expenses.forEach((e) => {
      if (!e.date) return;
      const date = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };
      grouped[date].expense += Number(e.amount);
    });

    return Object.entries(grouped).map(([date, { income, expense }]) => ({
      date,
      income,
      expense,
    }));
  }, [incomes, expenses]);

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
      title: "Total Budget",
      value: `₹${totalBudget.toLocaleString()}`,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Balance",
      value: `₹${totalBalance.toLocaleString()}`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  if (budgetLoading) {
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
            <Card className={`${card.bg} shadow-sm bg-D-blue`}>
              <CardHeader>
                <CardTitle className={`text-lg font-medium ${card.color}`}>
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

      {/* ---- Budget Utilization ---- */}
      <Card className="shadow-md bg-D-blue">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Budget Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white text-sm">
            You’ve used <span className="font-semibold">{utilization}%</span> of your total
            budget this month.
          </p>
        </CardContent>
      </Card>

      {/* ---- Combined Chart ---- */}
      <Card className="shadow-md bg-D-blue">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Income & Expenses Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#16a34a"
                strokeWidth={2}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#dc2626"
                strokeWidth={2}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ---- Recent Expenses ---- */}
      <Card className="shadow-md bg-D-blue text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses.length === 0 ? (
            <p className="text-gray-400">No recent expenses.</p>
          ) : (
            expenses.slice(-5).reverse().map((expense) => {
              const category = categories.find((c) => c.id === expense.categoryId);
              return (
                <div
                  key={expense.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-gray-400 text-xs">
                      {category ? category.title : "Uncategorized"} •{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold text-red-500">₹{expense.amount}</p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}


