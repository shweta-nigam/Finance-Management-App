import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Report() {
  const [view, setView] = useState<"month" | "year" | "custom">("month");

  // Example summary
  const summary = {
    income: 15000,
    expenses: 11000,
    savings: 4000,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>

        <select
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "year" | "custom")}
          className="border rounded-md px-3 py-2"
        >
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardContent className="p-4">
          <h2 className="text-sm text-gray-500">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">₹{summary.income}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <h2 className="text-sm text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹{summary.expenses}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <h2 className="text-sm text-gray-500">Savings</h2>
          <p className="text-2xl font-bold text-blue-600">₹{summary.savings}</p>
        </CardContent></Card>
      </div>

      {/* Charts Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Spending Over Time</h2>
          <div className="h-[250px] flex items-center justify-center text-gray-400">
            [Line Chart Here]
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Detailed Transactions</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">2025-09-01</td>
                <td className="p-2">Food</td>
                <td className="p-2">Expense</td>
                <td className="p-2 text-red-600">-₹500</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">2025-09-02</td>
                <td className="p-2">Salary</td>
                <td className="p-2">Income</td>
                <td className="p-2 text-green-600">+₹5000</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Export PDF</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Export Excel</button>
      </div>
    </div>
  );
}

export default Report;
