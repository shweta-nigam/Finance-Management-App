import axios from "axios"
import { useState } from "react"


export type Category = {
    id: string
    amount: number
    date: Date
    title: string
}

export function useCategoryAPi() {
    const [response, setResponse] = useState<Category | Category[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [date, setDate] = useState<Date | string>("")


    const createCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category> => {
        try {
            setError(null)
            const res = await axios.post(urlPath, data)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while creating category")
        }
        throw error
    }
    const updateCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category> => {
        try {
            setError(null)
            const res = await axios.patch(urlPath, data)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while updating category")
        }
        throw error
    }

const getCategory = async (urlPath: string) : Promise<Category>=> {
    try {
        setError(null)
        const res = await axios.get(urlPath)
        const category: Category = res.data.data.category
        setResponse(category)
    } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong while fetching category")
    }
    throw error
}

const getAllCategories = async (urlPath: string): Promise<Category>=> {
    try {
        setError(null)
        const res = await axios.get(urlPath)
        const category: Category = res.data.data.category
        setResponse(category)
    } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong while fetching categories")
    }
    throw error
}
const deleteCategory = async (urlPath: string): Promise<Category> =>  {
    try {
        setError(null)
        const res = await axios.delete(urlPath)
        const category: Category = res.data.data.category
        setResponse(category)
    } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong while deleting category")
    }
    throw error
}
const deleteAllCategories = async (urlPath: string): Promise<Category> => {
    try {
        setError(null)
        const res = await axios.delete(urlPath)
        const category: Category = res.data.data.category
        setResponse(category)
    } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong while deleting all categories")
    }
    throw error
}

return {response, error, date, createCategory, updateCategory, getCategory, getAllCategories, deleteCategory, deleteAllCategories}
}
