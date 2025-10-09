import axios from "axios"
import { useState } from "react"
import type { Category } from "@/types"

export function useCategoryApi() {
    const [response, setResponse] = useState<Category | Category[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const createCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.post(urlPath, data)
            const category = res.data.data.category
            setResponse(category)
            return category
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while creating category");
            throw err;
        }
    }

    const updateCategory = async (urlPath: string, data: Omit<Category, "id">): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.patch(urlPath, data)
            const category: Category = res.data.data.category
            setResponse(category)
            return category
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while updating category");
            throw err
        }
    }

    const getCategory = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            const category: Category = res.data.data.category
            setResponse(category)
            return category
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while fetching category")
            throw err
        }
    }

    const getAllCategories = async (urlPath: string): Promise<Category[] | null> => {
        try {
            setError(null)
            const res = await axios.get(urlPath)
            const categories: Category[] = res.data.data.categories
            setResponse(categories)
            // console.log("categories (useCategoryApi) : -----", categories)
            return categories
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while fetching categories")
            throw err
        }
    } 
    const deleteCategory = async (urlPath: string): Promise<Category | null> => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            const category: Category = res.data.data.category
            setResponse(category)
            return category
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while deleting category")
            throw err
        }
    }
    const deleteAllCategories = async (urlPath: string): Promise<Category[] | null> => {
        try {
            setError(null)
            const res = await axios.delete(urlPath)
            const categories: Category[] = res.data.data.categories
            setResponse(categories)
            return categories
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong while deleting all categories")
            throw err
        }
    }

    return { response, error, createCategory, updateCategory, getCategory, getAllCategories, deleteCategory, deleteAllCategories }
}
