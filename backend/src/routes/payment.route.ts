import { createPayment, deleteAllPayments, deletePayment, getAllPayments, getPayment, updatePayment } from "../controllers/payment.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"
import express from "express"
const paymentRoute = express.Router()

paymentRoute.post("/", isLoggedIn, createPayment)
paymentRoute.patch("/:id", isLoggedIn, updatePayment)
paymentRoute.get("/:id", isLoggedIn, getPayment)
paymentRoute.get("/", isLoggedIn, getAllPayments)
paymentRoute.delete("/:id", isLoggedIn, deletePayment)
paymentRoute.delete("/", isLoggedIn, deleteAllPayments)

export default paymentRoute