import mongoose,{mongo} from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type: String,require:true,unique:true},
    password: {type:String,require: true},
    verifyOtp:{type:String,default:""},
    verifyOtpExpireAt:{type:Date, default:null},
    isAccountVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Date,default:null}
})

const userModel = mongoose.model("User",userSchema)

export default userModel;

import { Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password?: string; // Password might not always be present in fetched objects
    verifyOtp?: string | null;
    verifyOtpExpireAt?: Date | null;
    isAccountVerified?: boolean;
    resetOtp?: string | null;
    resetOtpExpireAt?: Date | null;
    // Add other fields as necessary
}

export type UserDocument = IUser & Document;
