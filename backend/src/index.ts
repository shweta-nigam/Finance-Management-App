import express from "express"
import dotenv from "dotenv"
import { db } from "./db"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const port = process.env.PORT  ?? 3000

// db function
db()

app.use("api/v1")

//middlewares
app.use(cookieParser())
// Register the error middleware LAST
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);    
})