import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import axios from 'axios'
import toast from 'react-hot-toast'
import {io} from "socket.io-client"


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const useAuthStore=create((set,get)=>({
    authUser:null,
    onlineUsers:[],
    isSigningUp:false,
    isLoggingUp:false,
    isCheckingAuth:true,
    isUpdatingProfile:false,
    socket:null,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data.user})
            get().socketConnect();
        } catch (error) {
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    logout:async()=>{
        try {
            const res=await axiosInstance.post("/auth/logout");
            set({authUser:null})
            get().socketDisconnect();
            toast.success("logout successful")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login:async(user)=>{
        try {
            const res=await axiosInstance.post("/auth/login",user);
            set({authUser:res.data.user})
            get().socketConnect();

            toast.success(`Welcome ${res.data.user.fullName}`)
        } catch (error) {
            set({authUser:null})
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingUp:false})
        }
    }
    ,
    updateProfile:async(data)=>{
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data.user})
            toast.success("profile pic updated")
        } catch (error) {
            toast.error(error.response.data.message)

        }finally{
            set({isUpdatingProfile:false})
        }
    },

    signUp:async(user)=>{
        try {
            const res=await axiosInstance.post("/auth/signup",user);
            set({authUser:res.data.user})
            get().socketConnect();
            toast.success(`Welcome ${res.data.user.fullName}`)
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    setIsSigningUp:(value)=>{
        set({isSigningUp:value})
    },
    setIsLoginUp:(value)=>{
        set({isLoggingUp:value})
    },
    setIsUpdatingProfile:(value)=>{
        set({isUpdatingProfile:value})
    },

    socketConnect:()=>{
        const socket=io(BASE_URL,{
            query:{userId:get().authUser._id}
        })
        if(!get().authUser || get().socket?.connected) return;
        socket.connect();
        set({socket:socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    socketDisconnect:()=>{
        if(get().socket?.connected) get().socket?.disconnect();
        
    }



}))

export default useAuthStore