import { useState } from "react";
import type { Income } from "@/types";
import api from "@/axios/api";

export function useIncomeApi() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [month, setMonth] = useState<string>("");

  const createIncome = async (urlPath: string, data: Omit<Income, "id">) => {
    try {
      setError(null);
      const res = await api.post(urlPath, data);
      const income = res.data.data.income;
      setResponse(income);
      return income;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating income");
      throw err;
    }
  };

  const updateIncome = async (urlPath: string, data: Partial<Income>) => {
    try {
      setError(null);
      const res = await api.patch(urlPath, data);
      const income = res.data.data.income;
      setResponse(income);
      return income;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating income");
      throw err;
    }
  };

  const getAllIncomes = async (urlPath: string) => {
    try {
      setError(null);
      const res = await api.get(urlPath);
      const incomes = res.data.data.incomes;
      setResponse(incomes);

      // chart data (amount by day)
      const transformed = incomes.map((i: any) => ({
        day: new Date(i.date).getDate(),
        amount: i.amount,
      }));
      setChartData(transformed);

      if (incomes.length > 0) {
        const monthName = new Date(incomes[0].date).toLocaleDateString("default", {
          month: "long",
        });
        setMonth(monthName);
      }

      return incomes;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching incomes");
      throw err;
    }
  };

  const getIncomeById = async (urlPath: string) => {
    try {
      setError(null);
      const res = await api.get(urlPath);
      const income = res.data.data.income;
      setResponse(income);
      return income;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching income");
      throw err;
    }
  };

  const deleteIncome = async (urlPath: string) => {
    try {
      setError(null);
      const res = await api.delete(urlPath);
      const income = res.data.data.income;
      setResponse(income);
      return income;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting income");
      throw err;
    }
  };

  const deleteAllIncomes = async (urlPath: string) => {
    try {
      setError(null);
      const res = await api.delete(urlPath);
      const incomes = res.data.data.incomes;
      setResponse(incomes);
      return incomes;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting all incomes");
      throw err;
    }
  };

  return {
    response,
    chartData,
    month,
    error,
    createIncome,
    updateIncome,
    getIncomeById,
    getAllIncomes,
    deleteIncome,
    deleteAllIncomes,
  };
}
