import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import user from "../models/userModel"
import {Request,Response} from "express"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config({path:"../../.env"})

const secretKey = process.env.JWT_KEY;

export const registration = async (req:Request,res:Response) => {
    try{
        const {username,email,password} = req.body;

        if (!username || !email || !password){
            res.status(400).json({
                message:"All fields are required"
            })
        }

        const checkEmail = await user.findOne({email})

        if (checkEmail){
            return res.status(409).json({
                message:"Email already exist"
            })
        }

        //hashing password
        const hashPassword = await bcrypt.hash(password,5);

        const newUser = new user({
            username:username,
            email: email,
            password:hashPassword
        })
        await newUser.save();

        res.status(201).json({
            message: "User successfully created"
        })
    }
    catch(err){
        
        console.log("Something went wrong",err);

        res.status(500).send({
        message : "Something went wrong while receving data"
        })
          return;
        
    }
}

export const login = async (req:Request,res:Response) => {
    try{
        const {email,password} = req.body;

        //check whether all fields are filled or not

        if (!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const User = await user.findOne({email})

        if (!User || !User.password){
            return res.status(404).json({
                message:"User not found or missing credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,User.password)
        
        if (!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

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
            token:token,
            userID:User._id
        })
    }
    catch(err){
        console.log("something wrong",err);
        res.status(500).json({
        message: "Something went wrong"
        })
    }
}