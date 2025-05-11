import {Router} from 'express'
import {registration,login,logout, sendVerifyOtp, verifyEmail} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import {newContent,content,deleteContent, shareContent } from "../controllers/contentControllers"
const authRouter = Router()

authRouter.get("/content",isAuthenticated,content)
authRouter.post("/signup",registration)
authRouter.post("/signin",login)
authRouter.post("/logout",logout)
authRouter.post("/send-verify-otp",isAuthenticated,sendVerifyOtp)
authRouter.post("/verify-account",isAuthenticated,verifyEmail)
authRouter.post("/addcontent",isAuthenticated,newContent)
authRouter.delete("/delete/:contentId",isAuthenticated,deleteContent)
authRouter.get("/share/:userId",isAuthenticated,shareContent)

export default authRouter;