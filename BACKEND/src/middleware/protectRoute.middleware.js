
import jwt from "jsonwebtoken"
import userModel from "../models/user.models.js"
export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:"unauthorized"})
        }

        const user=await userModel.findById(decode._id).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        req.user=user;
        next();
    } catch (error) {
      
        return res.statue(404).json({message:"not authorized"})
    }
}