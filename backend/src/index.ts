import express from "express"
import dotenv from "dotenv"
import { db } from "./db"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route"
import budgetRoutes from "./routes/budget.route"

dotenv.config()

const app = express()
const port = process.env.PORT  ?? 3000

// db function
db()

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",authRoutes)
app.use("/api/v1",budgetRoutes)


// Register the error middleware LAST
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);    
})