import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel,{UserDocument} from "../models/userModel"
import { AuthenticatedRequest } from '../middleware/authMiddleware'
import {Request,Response} from "express"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import transporter from '../config/nodemailer';

dotenv.config({path:"../../.env"})



export const registration = async (req:Request,res:Response): Promise<void>  => {
    try{
        const {username,email,password} = req.body;

        if (!username || !email || !password){
            res.status(400).json({
                message:"All fields are required"
            })
            return;
        }

        const checkEmail = await userModel.findOne({email})

        if (checkEmail){
            res.status(409).json({
                message:"Email already exist"
            })
            return;
        }

        //hashing password
        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new userModel({
            username:username,
            email: email,
            password:hashPassword
        })
        await newUser.save();

        //sending welcome email
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Welcome to Second Brain',
            text:`Hi ${username},

            Thank you for signing up for Second Brain — your smart, organized space to save and manage everything that matters.

            Your account has been successfully created using the email: ${email}.

            Start capturing your ideas, saving useful links, and organizing your digital world, one thought at a time.

            Cheers,  
            The Second Brain Team`
        }

        await transporter.sendMail(mailOptions)

        res.status(201).json({
            message: "User successfully created"
        })
    }
    catch(err){
        

        res.status(500).send({
        message : `Something went wrong while registration: ${err}`
        })
          return;
        
    }
}

export const login = async (req:Request,res:Response): Promise<void>  => {
    try{
        const {email,password} = req.body;

        //check whether all fields are filled or not

        if (!email || !password){
            res.status(400).json({
                message:"All fields are required"
            })
            return;
        }

        const User = await userModel.findOne({email})

        if (!User || !User.password){
            res.status(404).json({
                message:"User not found or missing credentials"
            })
            return;
        }

        const isMatch = await bcrypt.compare(password,User.password)
        
        if (!isMatch){
            res.status(401).json({
                message:"Invalid credentials"
            })
            return
        }

        const secretKey = process.env.JWT_KEY;
        
        if (!secretKey){
            throw new Error('Value not available')
        }

        const token = jwt.sign({userID:User._id},secretKey,{expiresIn:"1h"})

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:3600000,
            path:'/',
            sameSite:'lax'
        })

        res.status(200).json({
            message:"Login successful",
            userID:User._id
        })
    }
    catch(err){
        res.status(500).json({
        message: `Something went wrong during signin ${err}`
        })
    }
}

export const logout = async(req:Request,res:Response):Promise<void> => {
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/"
        })

        res.status(200).json({
            message:"Logout successful"
        })
        return;
    }
    catch(err){
        res.status(500).json({
            message:`something went wrong during logout ${err}`
        })
    }
}

//send verification OTP to the User's Email
export const sendVerifyOtp = async(req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const userID = req.userID;

        const user = await userModel.findById(userID)


        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user.isAccountVerified){
            res.json({message:`Account already verified`})
            return;
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = new Date(Date.now() + 120 * 1000);
        await user.save(); 

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email as string,
            subject:'Account verification OTP',
            text:`Your account verification OTP is ${otp}. It will expire in 2 minutes`
        }

        await transporter.sendMail(mailOptions)

        res.json({message:"Verification OTP sent on Email"})
    }
    catch(err){
        res.status(500).json({
            message:`something went wrong during OTP mail ${err}`
        })
    }
}

export const verifyEmail = async(req:AuthenticatedRequest,res:Response):Promise<void> => {
    
    const userID = req.userID;
    const {otp} = req.body;
    console.log(otp)
    if (!userID || !otp){
        res.json({message:'Missing details'})
        return
    }

    try{
        const user = await userModel.findById(userID) as UserDocument | null;;

        if (!user){
            res.status(400).json({message:"User not found"});
            return
        }

        if (user.verifyOtp !== otp){
            res.status(401).json({message:"Incorrect OTP"})
            return;
        }

        if (!user.verifyOtpExpireAt || new Date() > user.verifyOtpExpireAt ){
            res.status(410).json({
                message:"OTP expired"
            })
            return
        }

        user.isAccountVerified = true;
        user.verifyOtp = ""
        user.verifyOtpExpireAt = null;

        await user.save()

        res.json({message:"Email verified successfully"})
    }
    catch(err){
        res.status(500).json({
            message:`something went wrong during email verification ${err}`
        })
    }
}