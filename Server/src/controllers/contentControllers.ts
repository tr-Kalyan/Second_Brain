import userContent from "../models/contentModel"
import { AuthenticatedRequest } from "../middleware/authMiddleware"
import {Request,Response} from "express"
import {getThumbnail} from '../utils/getThumbnails'





export const newContent = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const {link,title,tags} = req.body;

        const userid = req.userID;

        if (!link ||  !title || !userid){
            res.status(400).json({
                message:"All fields are required"
            })
            return
        }

        //generate thumbnail
        const thumbnailUrl = await getThumbnail(link)

        const contentCreated = new userContent({
            link:link,
            title:title,
            tags:tags,
            userId:userid,
            thumbnailUrl:thumbnailUrl
        })

        await contentCreated.save()

        res.status(200).json({
            message:"Content saved successfully",
            data:contentCreated
        })
    }
    catch(err){
        console.log("Something went wrong",err)

        res.status(500).json({
            message:"Something went wrong",err
        })
    }
}





export const content = async (req:AuthenticatedRequest,res:Response) => {
    try{
        const userid = req.userID;
    
        //checking userid present or not
        if(!userid){
          res.status(400).json({ message: "Something wrong" });
          return;
        }
    
        const userData = await userContent.find({ userId: userid });
        res.status(200).json({
          message: "User data fetched successfully",
          data: userData,
        });
        // console.log(userData)
      }catch(err){
        console.log("Err(catch): something went wrong",err)
        return;
      }
}

export const deleteContent = async (req:AuthenticatedRequest,res:Response) => {
    try{
        const userid = req.userID;
        const contentId = req.params.contentId;
        
        

        if (!userid || !contentId) {
            res.status(400).json({ message: "User ID or Content ID missing" });
            return;
        }

        const deletedContent = await userContent.findOneAndDelete({ _id: contentId, userId: userid });

        if (!deletedContent) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }


        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch(err){
        console.log("Something went wrong while deleting",err)

        res.status(500).json({
            message:"Something went wrong",err
        })
    }
}


export const editContent = async (req:AuthenticatedRequest,res:Response) => {
    try{
        const userId = req.userID;
        const contentId = req.params.contentId;
        const { title, link, tags } = req.body;

        if (!userId || ! contentId){
            res.status(400).json({
                message:"User ID or Content ID missing"
            })
            return;
        }


        //create thumbnail if the link changes
        const thumbnailUrl = await getThumbnail(link)

        const updatedContent = await userContent.findOneAndUpdate(
            {_id:contentId, userId:userId},
            {title,link,tags,thumbnailUrl},
            {new:true}
        )

        if (!updatedContent){
            res.status(404).json({
                message:"Content notfound or unauthorized"
            })
            return;
        }

        res.status(200).json({
            message:"Content updated successfully",
            data:updatedContent
        })
    }
    catch(err){
        console.error("Error while updating content:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


