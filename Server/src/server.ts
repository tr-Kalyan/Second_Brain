import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRoutes"
import pageRouter from './routes/pageRoutes';
import dbConnect from './config/db';

dotenv.config({path:"../.env"});

const app = express();

app.use(express.json())

const allowedOrigins = process.env.FRONTEND_URL?.split(',');


console.log(allowedOrigins)


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser())


dbConnect()

app.use("/api/auth",authRouter)
app.use("/api/user",pageRouter)


// const port = process.env.PORT_NUMBER

// console.log(process.env.DB_URL)
app.listen(process.env.PORT_NUMBER,() => {
    console.log(`Server is running on ${process.env.PORT_NUMBER}`)
})

