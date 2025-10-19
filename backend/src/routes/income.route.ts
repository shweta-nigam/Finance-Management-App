import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware"
import { createIncome, deleteAllIncomes, deleteIncome, getAllIncomes, getIncomeById, updateIncome } from "../controllers/income.controller"

const incomeRoutes = express.Router()

incomeRoutes.post("/", isLoggedIn, createIncome)
incomeRoutes.patch("/:BudgetId", isLoggedIn, updateIncome)
incomeRoutes.get("/", isLoggedIn, getAllIncomes)
incomeRoutes.get("/:BudgetId", isLoggedIn, getIncomeById)
incomeRoutes.delete("/:BudgetId", isLoggedIn, deleteIncome)
incomeRoutes.delete("/", isLoggedIn, deleteAllIncomes)

export default incomeRoutes