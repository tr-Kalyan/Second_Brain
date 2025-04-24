import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())
dotenv.config({path:"../.env"});
//app.post("api/v1",router)


const port = process.env.PORT
console.log(port)

app.listen(port,() => {
    console.log("Server is running")
})

