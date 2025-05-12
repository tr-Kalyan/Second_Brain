import {Router} from 'express'
import {registration,login,logout, sendVerifyOtp, verifyEmail,sendResetOtp,resetPassword} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import {newContent,content,deleteContent, shareContent } from "../controllers/contentControllers"
const pageRouter = Router()

pageRouter.get("/content",isAuthenticated,content)
pageRouter.post("/addcontent",isAuthenticated,newContent)
pageRouter.delete("/delete/:contentId",isAuthenticated,deleteContent)
pageRouter.get("/share/:userId",isAuthenticated,shareContent)

export default pageRouter;