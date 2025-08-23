import express from "express"
import { createBudget, deleteALlBudgets, deleteBudget, getAllBudgets, getBudgetById, updateBudget } from "../controllers/budget.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const budgetRoutes = express.Router()

budgetRoutes.post("/", isLoggedIn, createBudget)
budgetRoutes.patch("/:BudgetId", isLoggedIn, updateBudget)
budgetRoutes.get("/", isLoggedIn, getAllBudgets)
budgetRoutes.get("/:BudgetId", isLoggedIn, getBudgetById)
budgetRoutes.delete("/:BudgetId", isLoggedIn, deleteBudget)
budgetRoutes.delete("/", isLoggedIn, deleteALlBudgets)

export default budgetRoutes