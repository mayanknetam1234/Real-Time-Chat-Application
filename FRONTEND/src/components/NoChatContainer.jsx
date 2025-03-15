import { MessageSquare } from "lucide-react"

const NoChatContainer = () => {
  return (
    <div className="w-full flex flex-1 items-center justify-center bg-slate-900">
        <div className="bg-slate-600 flex flex-col gap-4 text-center p-8 rounded-xl">
            <div className="flex justify-center animate-bounce">
                <MessageSquare className="size-10"/>
            </div>
            <div>
                <p>Welcome to chatty!!</p>
            </div>
            <div>
                <p>Select a conversation from Sidebar to start chatting</p>
            </div>
        </div>
    </div>
  )
}
export default NoChatContainer