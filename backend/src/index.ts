import express from "express"
import dotenv from "dotenv"
import { db } from "./db"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"
import cors from "cors"

// routes
import authRoutes from "./routes/auth.route"
import budgetRoutes from "./routes/budget.route"
import expressRoute from "./routes/expense.route"
import subscriptionPlanRoute from "./routes/subscriptionPlan.route"
import paymentRoute from "./routes/payment.route"
import categoryRoute from "./routes/category.route"
import incomeRoutes from "./routes/income.route"

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions))

// db function
db()

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/budget", budgetRoutes)
app.use("/api/v1/expense", expressRoute)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/subscriptionPlan", subscriptionPlanRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/category", categoryRoute)


// Register the error middleware LAST
app.use(errorHandler)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})