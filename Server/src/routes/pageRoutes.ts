import {Router} from 'express'
import {registration,login,logout, sendVerifyOtp, verifyEmail,sendResetOtp,resetPassword} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import {newContent,content,deleteContent, editContent } from "../controllers/contentControllers"
import { generateShareLink, getSharedContent } from '../controllers/shareContentController'
const pageRouter = Router()

pageRouter.get("/content",isAuthenticated,content)
pageRouter.post("/addcontent",isAuthenticated,newContent)
pageRouter.delete("/delete/:contentId",isAuthenticated,deleteContent)
pageRouter.post("/generate-share-link",isAuthenticated,generateShareLink)
pageRouter.get("/shared/:token",getSharedContent)
pageRouter.put("/editcontent/:contentId",isAuthenticated,editContent)

export default pageRouter;