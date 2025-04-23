import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:"../../.env"})
const dbURL:String | undefined = process.env.DB_URL
console.log(dbURL)
const dbConnect = () => {
    mongoose.connect(`{dbURL}`).then(() => {
        console.log('connected successfully')
    }).catch((err) => {
        console.log("Something went wrong",err)
    })
}

export default dbConnect