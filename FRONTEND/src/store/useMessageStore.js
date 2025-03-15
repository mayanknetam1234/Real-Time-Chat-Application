import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";


const useMessageStore=create((set,get)=>({
    users:[],
    selectedUser:null,
    messages:[],
    isLoadingUsers:false,
    isLoadingMessages:false,
    isSendingMessage:false,


    sendMessage:async(data)=>{
        const {selectedUser,messages}=get()
        set({isSendingMessage:true})
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,data)
            set({messages:[...messages,res.data.response]})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSendingMessage:false})
        }
    },
    setUsers:async()=>{
        set({isLoadingUsers:true})
        try {
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data.users})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoadingUsers:false})
        }
    },
    setMessages:async(id)=>{
        set({isLoadingMessages:true})
        try {
            const res=await axiosInstance.get(`/messages/${id}`)
            set({messages:res.data.messages})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoadingMessages:false})
        }
    },
    setSelectedUser:(user)=>{
        set({selectedUser:user})
    },

    subscribeToMessages:()=>{
        const socket=useAuthStore.getState().socket;
        const selectedUser=get().selectedUser
        if(!selectedUser) return;

        socket.on("newMessage",(newMessage)=>{
            console.log(newMessage)
            if(newMessage.senderId==selectedUser._id){
                set({
                    messages:[...get().messages,newMessage]
                })
            }
        })
    },
    unsubscribeToMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage")
    }

}))

export default useMessageStore