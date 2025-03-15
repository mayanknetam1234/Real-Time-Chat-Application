import useAuthStore from "../store/useAuthStore"
import useMessageStore from "../store/useMessageStore"
import { IoMdClose } from "react-icons/io";
const ChatHeader = () => {
    const {selectedUser,setSelectedUser}=useMessageStore();
    const {onlineUsers}=useAuthStore()


  return (
    <div className="w-full h-14 bg-slate-600 flex flex-row ">
        <div className="basis-1/2 flex justify-start ">
            <div className="flex items-center">
                <div className="relative ml-2">
                            <img src={selectedUser.profilePic || "/avatar.jpg"} alt={selectedUser.fullName} 
                            className="size-12 rounded-full border-solid border-2 border-black"
                            />
                            {onlineUsers.includes(selectedUser._id) && <span className="bg-green-600 size-3 rounded-full absolute top-0 right-0"></span>}
                </div>
            </div>
            <div className="ml-2">
                    <div className="flex flex-col items-start pt-1">
                                <span className="text-yellow-500 font-sans">{selectedUser.fullName}</span>
                                <span className="text-xs font-normal">{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</span>
                    </div>
            </div>
        </div>
        <div className="basis-1/2 flex justify-end p-2 pr-5 ">
            <button
            onClick={()=>{
                setSelectedUser(null)
            }}
            >
            <IoMdClose className="size-6"/>
            </button>
        </div>

    </div>
  )
}
export default ChatHeader