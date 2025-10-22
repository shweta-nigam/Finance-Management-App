import express from "express"
import { createBudget, deleteALlBudgets, deleteBudget, getAllBudgets, getBudgetById, updateBudget } from "../controllers/budget.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const budgetRoutes = express.Router()

budgetRoutes.post("/", isLoggedIn, createBudget)
budgetRoutes.patch("/:budgetId", isLoggedIn, updateBudget)
budgetRoutes.get("/", isLoggedIn, getAllBudgets)
budgetRoutes.get("/:budgetId", isLoggedIn, getBudgetById)
budgetRoutes.delete("/:budgetId", isLoggedIn, deleteBudget)
budgetRoutes.delete("/", isLoggedIn, deleteALlBudgets)

export default budgetRoutes