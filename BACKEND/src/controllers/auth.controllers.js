import userModel from "../models/user.models.js";



export const signUp=async(req,res)=>{
    try {
        const {email,fullName,password,profilePic}=req.body;
        if(password.length<6){
            return res.status(400).json({message:"password length must be at least 6"})
        }
        let user =await userModel.findOne({email})
        //if user exist
        if(user){
            return res.status(400).json({message:"user already exist with this email"})
        }
         user=await userModel.create({...req.body})
         const token=user.createJWT(res)
         res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development"
          })
        res.status(200).json({message:"user created",email,fullName,token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"unsuccessful"
        })
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({email})

        if(!user){
           return res.status(400).json({message:"user does not exist sign up"})
        }

        const isValid=await user.comparePassword(password);
        if(!isValid){
            return res.status(404).json({message:"wrong password try again..."})
        }

        return res.status(200).json({
            message:"login successful",
            name:user.fullName,
            email,
            token:user.createJWT(res)
        })
        
    } catch (error) {
        console.log(error)
        res.send(500).json({
            message:"unsuccessful"
        })
    }
}
export const logout=(req,res)=>{
    res.send("logout")
}