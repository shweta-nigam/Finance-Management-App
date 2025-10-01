import axios from "axios";
import { useState } from "react";
import type { Budget } from "@/types";

export function useBudgetApi() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [month, setMonth] = useState<string>("");

  // Create new budget
  const createBudget = async (urlPath: string, data: Omit<Budget, "id">) => {
    try {
      setError(null);
      const res = await axios.post(urlPath, data);
      const budget = res.data.data.budget;
      setResponse(budget);
      return budget;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating budget");
      throw err;
    }
  };

  // Update budget
  const updateBudget = async (urlPath: string, data: Partial<Budget>) => {
    try {
      setError(null);
      const res = await axios.patch(urlPath, data);
      const budget = res.data.data.budget;
      setResponse(budget);
      return budget;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating budget");
      throw err;
    }
  };

  // Get all budgets
  const getAllBudgets = async (urlPath: string) => {
    try {
      setError(null);
      const res = await axios.get(urlPath);
      const budgets = res.data.data.budgets;
      setResponse(budgets);

      // chart data
      const transformed = budgets.map((b: any) => ({
        day: new Date(b.date).getDate(),
        amount: b.amount,
      }));
      setChartData(transformed);

      if (budgets.length > 0) {
        const monthName = new Date(budgets[0].date).toLocaleDateString("default", {
          month: "long",
        });
        setMonth(monthName);
      }

      return budgets;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching budgets");
      throw err;
    }
  };

  // Get single budget
  const getBudgetById = async (urlPath: string) => {
    try {
      setError(null);
      const res = await axios.get(urlPath);
      const budget = res.data.data.budget;
      setResponse(budget);
      return budget;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching budget");
      throw err;
    }
  };

  // Delete single budget
  const deleteBudget = async (urlPath: string) => {
    try {
      setError(null);
      const res = await axios.delete(urlPath);
      const budget = res.data.data.budget;
      setResponse(budget);
      return budget;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting budget");
      throw err;
    }
  };

  // Delete all budgets
  const deleteAllBudgets = async (urlPath: string) => {
    try {
      setError(null);
      const res = await axios.delete(urlPath);
      const budgets = res.data.data.budgets;
      setResponse(budgets);
      return budgets
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting all budgets");
      throw err;
    }
  };

  return {
    response,
    chartData,
    month,
    error,
    createBudget,
    updateBudget,
    getBudgetById,
    getAllBudgets,
    deleteBudget,
    deleteAllBudgets,
  };
}


//Note:-
//-- res.data is always the actual JSON body returned by the backend.
//-- Axios errors often look like:
// { response: { data: { message: "Budget not found" } } }
//  so errMessage -> error.response?.data?.message
// -- ?. (Safe Navigation) / optional chaining