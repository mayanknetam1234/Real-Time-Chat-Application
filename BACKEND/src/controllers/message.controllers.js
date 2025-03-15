import messageModel from "../models/message.models.js"
import userModel from "../models/user.models.js"
import cloudinary from "../services/cloudinary.services.js"
import { getSocketId, io } from "../services/socket.io.js"





export const getAllUser=async(req,res)=>{
    try {
        const userLoggedIn=req.user._id

        const filteredUser=await userModel.find({_id:{$ne:userLoggedIn}}).select("-password")
        return res.status(200).json({users:filteredUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params
        const myId=req.user._id;

        const messages=await messageModel.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
               })

        //todo real time msg functionality goes here socket io

        res.status(200).json({messages})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }

}


export const sendMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const {text,image}=req.body;
        const myId=req.user._id
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const response=await messageModel.create({
            senderId:myId,
            receiverId:userToChatId,
            text,
            image:imageUrl
        })
        const receiverSocketId=getSocketId(userToChatId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",response)
        }

        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}