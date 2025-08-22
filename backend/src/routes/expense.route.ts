import express from "express"
import { createExpense, deleteAllExpenses, deleteExpense, getAllExpense, getExpense, updateExpense } from "../controllers/expense.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const expressRoutes = express.Router()

expressRoutes.post("/", isLoggedIn, createExpense)
expressRoutes.patch("/:expenseId", isLoggedIn, updateExpense)
expressRoutes.get("/:expenseId", isLoggedIn, getExpense)
expressRoutes.get("/", isLoggedIn, getAllExpense)
expressRoutes.delete("/:expenseId", isLoggedIn, deleteExpense)
expressRoutes.delete("/", isLoggedIn, deleteAllExpenses)

export default expressRoutes