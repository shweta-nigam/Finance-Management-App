import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware"
import { createIncome, deleteAllIncomes, deleteIncome, getAllIncomes, getIncomeById, updateIncome } from "../controllers/income.controller"

const incomeRoutes = express.Router()

incomeRoutes.post("/", isLoggedIn, createIncome)
incomeRoutes.patch("/:incomeId", isLoggedIn, updateIncome)
incomeRoutes.get("/", isLoggedIn, getAllIncomes)
incomeRoutes.get("/:incomeId", isLoggedIn, getIncomeById)
incomeRoutes.delete("/:incomeId", isLoggedIn, deleteIncome)
incomeRoutes.delete("/", isLoggedIn, deleteAllIncomes)

export default incomeRoutes