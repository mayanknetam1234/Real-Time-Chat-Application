import ChatContainer from "../components/ChatContainer"
import NoChatContainer from "../components/NoChatContainer"
import Sidebar from "../components/Sidebar"
import useMessageStore from "../store/useMessageStore"

const Home = () => {
  const {selectedUser}=useMessageStore()
  return (
    <div className=" bg-slate-800 h-screen flex  justify-center px-16 pt-12 "> 
      <div className="bg-slate-950 w-full h-[90vh] rounded-xl">
        <div className="flex w-full h-full rounded-xl overflow-hidden">
          <Sidebar></Sidebar>
          {selectedUser?<ChatContainer></ChatContainer>:<NoChatContainer></NoChatContainer>}
        </div>
      </div>

    </div>
  )
}
export default Home