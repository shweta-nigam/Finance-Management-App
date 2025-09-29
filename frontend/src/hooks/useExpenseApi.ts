import axios from "axios"
import { useState } from "react"
import type { Expense } from "@/types";

export function useExpenseApi() {
    const [response, setResponse] = useState<Expense | Expense[] | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [date, setDate] = useState<Date | string>("")

    const createExpense = async (urlPath: string, data: Omit<Expense, "id">): Promise<Expense> => {
        try {
            setError(null)
            const res = await axios.post(urlPath, data)
            const expense: Expense = res.data.data.expense
            setResponse(expense)
            // console.log("createExpense raw response:", res.data);
            return expense
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while creating expense")
        }
        throw error
    }

    const updateExpense = async (
        urlPath: string,
        data: Partial<Expense>
    ): Promise<Expense> => {
        try {
            setError(null);
            const res = await axios.patch(urlPath, data);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while updating expense"
            );
            throw error;
        }
    }

    const getExpense = async (urlPath: string): Promise<Expense> => {
        try {
            setError(null);
            const res = await axios.get(urlPath);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while fetching expense"
            );
            throw error;
        }
    };

    const getAllExpenses = async (urlPath: string): Promise<Expense[]> => {
        try {
            setError(null);
            const res = await axios.get(urlPath);
            const payload = res.data
            const expenses: Expense[] = payload?.data ?? payload;
            setResponse(expenses);
            // console.log("expenses from api (expenseAPi): expenses", expenses);
            // console.log("expenses from api (expenseAPi): res.data", res.data);
            return expenses;
            
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while fetching all expenses"
            );
            throw error;
        }
    };

    const deleteExpense = async (urlPath: string): Promise<Expense> => {
        try {
            setError(null);
            const res = await axios.delete(urlPath);
            const expense: Expense = res.data.data.expense;
            setResponse(expense);
            return expense;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while deleting expense"
            );
            throw error;
        }
    };

    const deleteAllExpenses = async (urlPath: string): Promise<Expense[]> => {
        try {
            setError(null);
            const res = await axios.delete(urlPath);
            const expenses: Expense[] = res.data.data.expenses;
            setResponse(expenses);
            return expenses;
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while deleting all expenses"
            );
            throw error;
        }
    };

    return { response, error, date, createExpense, updateExpense, getExpense, getAllExpenses, deleteExpense, deleteAllExpenses }

}