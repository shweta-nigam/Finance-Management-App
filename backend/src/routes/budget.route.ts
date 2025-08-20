import express from "express"
import { createBudget, deleteALlBudgets, deleteBudget, getAllBudget, getBudgetById, updateBudget } from "../controllers/budget.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const budgetRoutes = express.Router()

// budgetRoutes.post("/create-budget", isLoggedIn, createBudget)
// budgetRoutes.patch("/update-budget", isLoggedIn, createBudget)
// budgetRoutes.get("/get-all-budget", isLoggedIn, getAllBudget)
// budgetRoutes.get("/get-budget-by-id/:BudgetId", isLoggedIn, getBudgetById)
// budgetRoutes.delete("/delete-budget/:BudgetId", isLoggedIn, deleteBudget)
// budgetRoutes.delete("/delete-all-budgets", isLoggedIn, deleteALlBudgets)

// using good practices :-

budgetRoutes.post("/", isLoggedIn, createBudget)
budgetRoutes.patch("/:BudgetId", isLoggedIn, updateBudget)
budgetRoutes.get("/", isLoggedIn, getAllBudget)
budgetRoutes.get("/:BudgetId", isLoggedIn, getBudgetById)
budgetRoutes.delete("/:BudgetId", isLoggedIn, deleteBudget)
budgetRoutes.delete("/", isLoggedIn, deleteALlBudgets)

export default budgetRoutes