import { userApi } from "../models/user.js";
import bcrypt from "bcrypt";
import errorHandler from "../middlewares/error.js";
import { sendCookie } from "../utils/features.js";

export const register = async (req,res,next)=>{

   try {

    const {name, email, password} = req.body;
    let user = await userApi.findOne({email});
    if(user) return next(new errorHandler("User already exists",400));

    const hashedPassword = await bcrypt.hash(password,10);
     user  = await userApi.create({
        name,
        email,
        password: hashedPassword
    })

    sendCookie(user,res,"registered successfully",
    201);
    
   } catch (error) {
        next(error);
   }
};

export const login = async (req,res,next)=>{
    
    try {

        const {email, password} = req.body;
        let user = await userApi.findOne({email}).select("+password");
        if(!user) return next(new errorHandler("Incorrect credentials",400));
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new errorHandler("Incorrect credentials",400));
    
       sendCookie(user,res,`welcome back, ${user.name}!`,200);
        
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = async (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
    
};

export const logout = async (req,res)=>{
    res
        .status(200)
        .cookie("token","",{
        expires: new Date(Date.now()),
        samesite: process.env.NODE_ENV==="Development" ? "lax":"none",  
        secure: process.env.NODE_ENV==="Development" ? false:true
    }).json({
        success: true,
        user:req.user
    })
    
};
