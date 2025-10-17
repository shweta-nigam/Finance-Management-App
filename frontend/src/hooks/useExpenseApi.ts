import { useState } from "react"
import type { Expense } from "@/types";
import api from "@/axios/api";

export function useExpenseApi() {
    const [response, setResponse] = useState<Expense | Expense[] | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false);

    const createExpense = async (urlPath: string, data: Omit<Expense, "id">): Promise<Expense> => {
        try {
            setError(null)
            setLoading(true)
            const res = await api.post(urlPath, data)
            const expense: Expense = res.data.data.expense
            setResponse(expense)
            // console.log("createExpense raw response:", res.data);
            return expense
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Something went wrong while creating expense"
            )
            throw error
        } finally {
            setLoading(false)
        }

    }

    const updateExpense = async (
        urlPath: string,
        data: Partial<Expense>
    ): Promise<Expense> => {
        try {
            setLoading(true)
            setError(null);
            const res = await api.patch(urlPath, data);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while updating expense"
            );
            throw error;
        } finally {
            setLoading(false)
        }

    }

    const getExpense = async (urlPath: string): Promise<Expense> => {
        try {
            setError(null);
            setLoading(true)
            const res = await api.get(urlPath);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while fetching expense"
            );
            throw error;
        } finally {
            setLoading(false)
        }
    };

    const getAllExpenses = async (urlPath: string): Promise<Expense[]> => {
        try {
            setError(null);
            setLoading(true)
            const res = await api.get(urlPath);
            const expenses: Expense[] = res.data.data.expenses ?? [];
            setResponse(expenses);
            return expenses;

        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while fetching all expenses"
            );
            throw error;
        } finally {
            setLoading(false)
        }
    };

    const deleteExpense = async (urlPath: string): Promise<Expense> => {
        try {
            setError(null);
            setLoading(true)
            const res = await api.delete(urlPath);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while deleting expense"
            );
            throw error;
        } finally {
            setLoading(false)
        }
    };

    const deleteAllExpenses = async (urlPath: string): Promise<Expense[]> => {
        try {
            setError(null);
            setLoading(true)
            const res = await api.delete(urlPath);
            const expenses: Expense[] = res.data.data.expenses ?? [];
            setResponse(expenses);
            return expenses;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while deleting all expenses"
            );
            throw error;
        } finally {
            setLoading(false)
        }
    };

    return { response, error, loading, createExpense, updateExpense, getExpense, getAllExpenses, deleteExpense, deleteAllExpenses }

}