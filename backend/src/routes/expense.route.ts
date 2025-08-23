import express from "express"
import { createExpense, deleteAllExpenses, deleteExpense, getAllExpenses, getExpense, updateExpense } from "../controllers/expense.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const expressRoute = express.Router()

expressRoute.post("/", isLoggedIn, createExpense)
expressRoute.patch("/:expenseId", isLoggedIn, updateExpense)
expressRoute.get("/:expenseId", isLoggedIn, getExpense)
expressRoute.get("/", isLoggedIn, getAllExpenses)
expressRoute.delete("/:expenseId", isLoggedIn, deleteExpense)
expressRoute.delete("/", isLoggedIn, deleteAllExpenses)

export default expressRoute