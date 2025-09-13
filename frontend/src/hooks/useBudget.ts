import axios from "axios"
import { useState } from "react"

export function useBudget() {
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<null | string>(null)
    const [chartData, setChartData] = useState<any[]>([])



    const createBudget = async (urlPath: string, data: any) => {
        try {
            setError(null)
            const res = await axios.post(urlPath, data)
            setResponse(res.data.data.budget)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while creating budget")
        }
    }
    const updateBudget = async (urlPath: string, data: any) => {
        try {
            setError(null)
            const res = await axios.patch(urlPath, data)
            setResponse(res.data.data.budget)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while updating budget")
        }
    }
    const getBudget = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            setResponse(res.data.data)

            // tranform to chart data
            if (res.data.data?.date && res.data.data?.amount) {
                setChartData([
                    {
                        day: new Date(res.data.data.date).getDate(),
                        amount: res.data.data.amount,
                    }
                ])
            }

        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching budget details")
        }
    }
    const getAllBudgets = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            setResponse(res.data.data.budgets)

            // convert to chart data
            const tranformed = res.data.data.budgets.map((b: any) => ({
                day: new Date(b.date).getDate(),
                amount: b.amount,
            }))
            setChartData(tranformed)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching budgets details")
        }
    }
    const deleteBudget = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            setResponse(res.data.data.budget)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting budget")
        }
    }
    const deleteAllBudgets = async (urlPath: string) => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            setResponse(res.data.data)                    // as data is null in backend
            // setResponse(res.data.message)     // to show a msg
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting budgets")
        }
    }

    return { response, chartData, error, createBudget, updateBudget, getBudget, getAllBudgets, deleteBudget, deleteAllBudgets }
}

//Note:-
//-- res.data is always the actual JSON body returned by the backend.
//-- Axios errors often look like:
// { response: { data: { message: "Budget not found" } } }
//  so errMessage -> error.response?.data?.message
// -- ?. (Safe Navigation) / optional chaining