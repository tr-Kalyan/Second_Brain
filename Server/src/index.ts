import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
dotenv.config({path:"../.env"});
//app.post("api/v1",router)


const port = process.env.PORT
console.log(port)

