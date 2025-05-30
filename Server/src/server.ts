import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRoutes"
import pageRouter from './routes/pageRoutes';
import dbConnect from './config/db';

const app = express();

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())
dotenv.config({path:"../.env"});

dbConnect()

app.use("/api/auth",authRouter)
app.use("/api/user",pageRouter)


// const port = process.env.PORT_NUMBER

// console.log(process.env.DB_URL)
app.listen(process.env.PORT_NUMBER,() => {
    console.log(`Server is running on ${process.env.PORT_NUMBER}`)
})

