import {Router} from 'express'
import {registration,login,logout, sendVerifyOtp, verifyEmail,sendResetOtp,resetPassword} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import {newContent,content,deleteContent, shareContent, Thumbnail, editContent } from "../controllers/contentControllers"
const pageRouter = Router()

pageRouter.get("/content",isAuthenticated,content)
pageRouter.post("/addcontent",isAuthenticated,newContent)
pageRouter.get("/thumbnail",isAuthenticated,Thumbnail)
pageRouter.delete("/delete/:contentId",isAuthenticated,deleteContent)
pageRouter.get("/share/:userId",isAuthenticated,shareContent)
pageRouter.put("/editcontent/:contentId",isAuthenticated,editContent)

export default pageRouter;