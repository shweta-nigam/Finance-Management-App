import express from "express"
import { googleAuth, login, logout, register, verify } from "../controllers/auth.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"

const authRoutes = express.Router()

authRoutes.post("/register", register)
authRoutes.post("/verify/:token", verify)
authRoutes.post("/login", login)
authRoutes.post("/logout",isLoggedIn, logout)

authRoutes.post("/google", googleAuth)

export default authRoutes