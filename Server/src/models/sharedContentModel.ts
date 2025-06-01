import mongoose from "mongoose";

const sharedContentModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60 * 60 * 24 * 7 //Expires in 7 days
    }
})

const sharedContent = mongoose.model("sharedContent",sharedContentModel)


export default sharedContent;