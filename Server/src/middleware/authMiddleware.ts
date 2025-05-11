import {Request,Response,NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {Types} from 'mongoose';

export interface AuthenticatedRequest extends Request{
    userID?:String |JwtPayload;
}

export const isAuthenticated = (req:AuthenticatedRequest,res:Response,next:NextFunction):void =>{
    try{
        const {token} = req.cookies;

        

        if(!token){
            res.status(401).json({
                message:"Bad token request"
            })
            
            return
        }

        const secretKey = process.env.JWT_KEY

        if (!secretKey){
            res.status(500).json({
                message:"internal server problem"
            })
            return
            
        }

        

        const decoded = jwt.verify(token,secretKey) as unknown as {userID:Types.ObjectId}

        req.userID = decoded.userID

        return next()
    }   
    catch(err){
        res.status(401).json({
            message:`Unauthorized: Invalid or expired token ${err}`
        })
        return
    }
}