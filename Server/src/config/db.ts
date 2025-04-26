import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:"../../.env"})
// const dbURL:String|undefined= process.env.DB_URL

const dbConnect = () => {
    mongoose.connect(`${process.env.DB_URL}`).then(() => {
        console.log('connected successfully')
    }).catch((err) => {
        console.log("Unable to connect to db",err)
    })
}

export default dbConnect