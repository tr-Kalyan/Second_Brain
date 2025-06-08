import { AuthenticatedRequest } from "../middleware/authMiddleware";
import sharedContent from "../models/sharedContentModel";
import { v4 as uuidv4 } from "uuid";
import { Request,Response } from "express";
import dotenv from 'dotenv'
import userContent from "../models/contentModel";

dotenv.config({path:'../.env'})

const frontendUrls = process.env.FRONTEND_URL?.split(',');
const frontendUrl = frontendUrls?.[1] || frontendUrls?.[0]; 

export const generateShareLink = async(req:AuthenticatedRequest,res:Response) => {

    const userId = req.userID;

    try{
        //delete already existing link
        await sharedContent.deleteOne({userId})

        //generate secure random identifier
        const token = uuidv4();

        //save the identifier in db
        const shared = new sharedContent({userId,token})
        await shared.save()


        res.status(201).json({
            shareLink:`${frontendUrl}/shared/${token}` 
        })
    }
    catch(err){
        console.log("Error generating share link:", err);
        res.status(500).json({ message: "Failed to generate share link." });
    }
}

export const getSharedContent = async (req:Request,res:Response):Promise<void> => {
    
    const {token} = req.params;

    try{
        const shared = await sharedContent.findOne({token});

        if (!shared){
            res.status(404).json({
                message:"Invalid or expired link"
            })
            return
        }

        const content = await userContent.find({userId:shared.userId});

        
        res.status(200).json({data:content})
        return 
        
    }
    catch(err){
        console.log("Error fetching shared content:", err);
        res.status(500).json({ message: "Server error" });
    }
}