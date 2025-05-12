import userModel from "../models/userModel";
import {Request,Response} from "express"
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const getUserData = async(req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const userID = req.userID;

        const user = await userModel.findById(userID)

        if (!user){
            res.status(404).json({message:"User not found"})
            return;
        }

        res.status(200).json({
            userData:{
                name:user.username,
                isAccountVerified:user.isAccountVerified
            }
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}