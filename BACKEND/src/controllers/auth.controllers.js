import userModel from "../models/user.models.js";
import cloudinary from "../services/cloudinary.services.js";
import sendCookie from "../services/cookie.services.js";



export const signUp=async(req,res)=>{
    try {
        const {email,fullName,password,profilePic}=req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password length must be at least 6"})
        }
        let user =await userModel.findOne({email})
        //if user exist
        if(user){
            return res.status(400).json({message:"user already exist with this email"})
        }


        user=await userModel.create({...req.body})
        const token=user.createJWT()
        sendCookie(res,token)
        return res.status(200).json({message:"user created",user})
        
    } catch (error) {
        res.status(500).json({
            message:"unsuccessful"
        })
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if( !email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        const user=await userModel.findOne({email})

        if(!user){
           return res.status(400).json({message:"wrong credentials"})
        }

        const isValid=await user.comparePassword(password);
        if(!isValid){
            return res.status(404).json({message:"invalid credentials"})
        }
        const token=user.createJWT()
        sendCookie(res,token)
        const obj={fullName:user.fullName,email:user.email,profilePic:user.profilePic}
        return res.status(200).json({
            message:"login successful",
            user:obj
        })

        
    } catch (error) {
       
        res.send(500).json({
            message:"internal server error"
        })
    }
}
export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"logout successful"})
        
    } catch (error) {
       
        res.status(500).json({message:"internal server error"})
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user;
        if(!profilePic){
            return res.status(400).json({message:"please provide the image"})
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        const user=await userModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true}).select("-password")
        return res.status(200).json({message:"profile pic uploaded",user})
    } catch (error) {
       
        res.status(400).json({message:"internal server error"})
    }
}

export const getProfile=async(req,res)=>{
    try {
        return res.status(200).json({message:"got the user",user:req.user})
    } catch (error) {
       
        res.status(500).json({message:"error"})
    }
}