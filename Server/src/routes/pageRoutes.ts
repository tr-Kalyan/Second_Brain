import {Router} from 'express'
import {registration,login} from "../controllers/authController"
import { isAuthenticated } from '../middleware/authMiddleware'
import {newContent,content,deleteContent, shareContent } from "../controllers/contentControllers"
const router = Router()

router.get("/content",isAuthenticated,content)
router.post("/signup",registration)
router.post("/signin",login)
router.post("/addcontent",isAuthenticated,newContent)
router.delete("/delete/:contentId",isAuthenticated,deleteContent)
router.get("/share/:userId",isAuthenticated,shareContent)

export default router;