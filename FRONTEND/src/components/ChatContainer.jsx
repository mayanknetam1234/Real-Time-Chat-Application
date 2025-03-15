import { useEffect, useRef } from "react"
import useMessageStore from "../store/useMessageStore"
import {Loader} from 'lucide-react'
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import MessageSkeleton from "./skeleton/MessageSkeleton"
import useAuthStore from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils.js"
const ChatContainer = () => {
    const {selectedUser,setMessages,isLoadingMessages,messages,subscribeToMessages,unsubscribeToMessages}=useMessageStore()
    const {authUser}=useAuthStore()
    const messageRef=useRef(null);
    useEffect(()=>{
        setMessages(selectedUser._id);
        subscribeToMessages()
        return ()=>unsubscribeToMessages();
    },[ selectedUser._id,setMessages,subscribeToMessages,unsubscribeToMessages])

    useEffect(()=>{
        if(messageRef.current && messages){
            messageRef.current.scrollIntoView({behavior:"smooth"})
            
        }
    },[messages])


    if(isLoadingMessages) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader></ChatHeader>
            <MessageSkeleton></MessageSkeleton>
            <ChatInput></ChatInput>
        </div>
        
    )
  return (
    <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader></ChatHeader>
        <div className="w-full flex-1 overflow-y-auto p-2 space-y-2 ">
            {
                messages.map((message)=>{
                    const {senderId,receiverId,text,image,createdAt,_id}=message
                    return(
                        <div
                        key={_id}
                        className={` py-2 flex flex-row  ${senderId==authUser._id?"justify-end":"justify-start"} `}
                        ref={messageRef}
                        >
                            <div className={`flex  gap-4 ${senderId==authUser._id?"flex-row-reverse":"flex-row"}`}>
                                <div className="rounded-full pt-8">
                                    <img 
                                    className="size-10 rounded-full"
                                    src={(senderId==authUser._id?authUser.profilePic:selectedUser.profilePic) || '/avatar.jpg'} 
                                    alt="profilePic" />
                                </div>
                                <div className={`flex gap-3  flex-col ${senderId==authUser._id?"items-end":"items-start"}`}>
                                    <div className={`flex   ${senderId==authUser._id?"justify-end":"justify-start"}`} >
                                        <p>{formatMessageTime(createdAt)}</p>
                                    </div>
                                    <div    >
                                        <div className={`w-fit flex flex-col rounded-lg bg-slate-600 p-2 ${senderId==authUser._id?"items-end":"items-start"}`}>

                                            <div>
                                                {image && 
                                                (<img
                                                src={image}
                                                alt="pic"
                                                className="size-32 rounded-md"
                                                />)
                                                }

                                            </div>
                                            <div>
                                                <p>{text}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                })
            }

        </div>
        <ChatInput></ChatInput>
    </div>
  )
}
export default ChatContainer