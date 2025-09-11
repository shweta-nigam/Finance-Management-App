import React, { useState } from "react";

interface BudgetItem {
  name: string;
  budget: number;
  actual: number;
}

function Budget() {
  const [view, setView] = useState<"month" | "year" | "all">("month"); // restricts allowed values
  const [editing, setEditing] = useState<boolean>(false);

  // Strongly typed initial state
  const [budgetData, setBudgetData] = useState<BudgetItem[]>([
    { name: "Food", budget: 500, actual: 650 },
    { name: "Rent", budget: 1200, actual: 1200 },
    { name: "Travel", budget: 300, actual: 180 },
    { name: "Entertainment", budget: 200, actual: 250 },
    { name: "Savings", budget: 800, actual: 600 },
  ]);

  // Type-safe handler
  const handleBudgetChange = (index: number, newValue: string | number): void => {
    const updated = [...budgetData];
    updated[index].budget = Number(newValue);
    setBudgetData(updated);
  };

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget Overview</h1>

        <select
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "year" | "all")}
          className="border rounded-md px-3 py-2"
        >
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Years</option>
        </select>
      </div>

      {/* Budget Table */}
      <div className="shadow-md border rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Budget Breakdown</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-1 bg-blue-600 text-white rounded-md"
          >
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Category</th>
              <th className="p-2">Budget (₹)</th>
              <th className="p-2">Actual (₹)</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  {editing ? (
                    <input
                      type="number"
                      value={item.budget}
                      onChange={(e) => handleBudgetChange(index, e.target.value)}
                      className="border rounded-md px-2 py-1 w-24"
                    />
                  ) : (
                    <span>₹{item.budget}</span>
                  )}
                </td>
                <td className="p-2 text-gray-600">₹{item.actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget vs Actual Comparison */}
      <div className="shadow-md border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold">Budget vs Actual Spending</h2>
        {budgetData.map((item, index) => {
          const percentage = Math.min((item.actual / item.budget) * 100, 100);
          const overSpent = item.actual > item.budget;

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className={overSpent ? "text-red-600" : "text-green-600"}>
                  {item.actual > item.budget
                    ? `Overspent by ₹${item.actual - item.budget}`
                    : `Saved ₹${item.budget - item.actual}`}
                </span>
              </div>
              {/* progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    overSpent ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Budget;
