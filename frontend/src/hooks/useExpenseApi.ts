import axios from "axios"
import { useState } from "react"


export type Expense = {
    id: string;
    description: string;
    amount: number;
    date: string;
    categoryId: string;
};

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
            return expense
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while creating expense")
        }
        throw error
    }

    const updateExpense = async (urlPath: string, data: any) => {
        try {
            setError(null)
            const res = await axios.patch(urlPath, data)
            setResponse(res.data.data.expense)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while updating expense")
        }
    }

    const getExpense = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            setResponse(res.data.data.expense)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching expense")
        }
    }

    const getAllExpenses = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            setResponse(res.data.data.expenses)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching all expenses")
        }
    }

    const deleteExpense = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            setResponse(res.data.data.expense)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting expense")
        }
    }

    const deleteAllExpenses = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            setResponse(res.data.data.expense)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting all expenses")
        }
    }

    return { response, error, date, createExpense, updateExpense, getExpense, getAllExpenses, deleteExpense, deleteAllExpenses }

}