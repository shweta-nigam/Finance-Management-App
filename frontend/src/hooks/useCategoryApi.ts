import axios from "axios"
import { useState } from "react"
import type { Category } from "@/types"

export function useCategoryAPi() {
    const [response, setResponse] = useState<Category | Category[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [date, setDate] = useState<Date | string>("")


    const createCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.post(urlPath, data)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while creating category");
            return null
        }
        return null
    }

    const updateCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.patch(urlPath, data)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while updating category");
            return null
        }
        return null
    }

    const getCategory = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching category")
            return null
        }
        return null
    }

    const getAllCategories = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            const categories: Category[] = res.data.data.categories
            setResponse(categories)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while fetching categories")
            return null
        }
        return null
    }
    const deleteCategory = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            const category: Category = res.data.data.category
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting category")
            return null
        }
        return null
    }
    const deleteAllCategories = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            const category: Category = res.data.data.categories
            setResponse(category)
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong while deleting all categories")
            return null
        }
        return null
    }

    return { response, error, date, createCategory, updateCategory, getCategory, getAllCategories, deleteCategory, deleteAllCategories }
}
