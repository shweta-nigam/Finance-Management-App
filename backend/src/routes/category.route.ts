import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware"
import { createCategory, deleteAllCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller"

const categoryRoute = express.Router()

categoryRoute.post("/", isLoggedIn, createCategory)
categoryRoute.patch("/:categoryId", isLoggedIn, updateCategory)
categoryRoute.get("/:categoryId", isLoggedIn, getCategory)
categoryRoute.get("/", isLoggedIn, getAllCategories)
categoryRoute.delete("/:categoryId", isLoggedIn, deleteCategory)
categoryRoute.delete("/", isLoggedIn, deleteAllCategory)

export default categoryRoute