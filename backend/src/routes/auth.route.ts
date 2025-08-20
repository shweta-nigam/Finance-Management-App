import express from "express"
import { login, logout, register, verify } from "../controllers/auth.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const authRoutes = express.Router()

authRoutes.post("/register", register)
authRoutes.get("/verify/:token", verify)
authRoutes.post("/login", login)
authRoutes.get("/logout",isLoggedIn, logout)

export default authRoutes