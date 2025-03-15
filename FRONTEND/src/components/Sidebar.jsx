import { useEffect, useState } from "react";
import useMessageStore from "../store/useMessageStore"
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const Sidebar = () => {
    const {users,selectedUser,isLoadingUsers,setUsers,setSelectedUser}=useMessageStore();
    const {onlineUsers}=useAuthStore();
    const [showOnlineUsers,setShowOnlineUsers]=useState(false)
    const handleOnlineUsers=(e)=>{
        setShowOnlineUsers(e.target.checked)

    }
    useEffect(()=>{
        setUsers();
    },[setUsers])

    if(isLoadingUsers ) return <SidebarSkeleton></SidebarSkeleton>
  return (
    <div className="h-full w-80 flex flex-col pt-2">
        <div className="pl-1 mb-0 py-2">
            <User className="size-6 inline"/>
            <span className="ml-2 text-center text-md ">Contacts</span>
        </div>
      
        <div className="flex gap-3 pl-2 pb-2">
            <input 
            type="checkbox" 
            checked={showOnlineUsers}
            onChange={handleOnlineUsers}
            name="onlineUsers" id="onlineUsers" />
            <p className="font-semibold">Show online users {`(${onlineUsers.length-1})`}</p>
        </div>
        <hr />
        <div className="flex flex-col overflow-y-auto">
            {users.map((user,idx)=>{
            
                if((!showOnlineUsers) ||  (showOnlineUsers && onlineUsers.includes(user._id)) ){
                    return  <button
                    key={user._id}
                    type="button"
                    onClick={()=>{
                        setSelectedUser(user)
                        // onlineUsers.push(user._id)
                    }}
                    className={`w-full flex items-center gap-3 hover:bg-base-300 transition-colors p-2
                ${selectedUser?._id==user._id?"bg-base-300 ring-1 ring-base-300":""} `   }
                    >
                        <div className="relative">
                            <img src={user.profilePic || "/avatar.jpg"} alt={user.fullName} 
                            className="size-8 rounded-full"
                            />
                            {onlineUsers.includes(user._id) && <span className="bg-green-600 size-3 rounded-full absolute top-0 right-0"></span>}
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-yellow-500 font-sans">{user.fullName}</span>
                            <span className="text-xs font-normal">{onlineUsers.includes(user._id)?"Online":"Offline"}</span>
                        </div>
                    </button>
                }
            }
                
                    
              
               
            )}
            {onlineUsers.length<=1&& showOnlineUsers && <p className="p-2 font-semibold">No online users</p>}
        </div>
        
    </div>
  )
}
export default Sidebar