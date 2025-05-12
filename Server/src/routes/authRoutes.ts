import {Router} from 'express'
import {registration,login,logout, sendVerifyOtp, verifyEmail,sendResetOtp,resetPassword} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import { getUserData } from '../controllers/userController';
const authRouter = Router();

authRouter.post("/signup",registration)
authRouter.post("/signin",login)
authRouter.post("/logout",logout)
authRouter.post("/send-verify-otp",isAuthenticated,sendVerifyOtp)
authRouter.post("/verify-account",isAuthenticated,verifyEmail)
authRouter.post("/send-reset-otp",sendResetOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.get("/data",isAuthenticated,getUserData)

export default authRouter;