import express from "express"
import { login, logout, register, verify } from "../controllers/auth.controllers"

const authRoutes = express.Router()

authRoutes.post("/register", register)
authRoutes.get("/verify/:token", verify)
authRoutes.post("/login", login)
authRoutes.get("/logout", logout)

export default authRoutes