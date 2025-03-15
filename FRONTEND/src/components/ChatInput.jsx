import { useRef, useState } from "react"
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import useMessageStore from "../store/useMessageStore";
const ChatInput = () => {
  const [currentMessage,setCurrentMessage]=useState("")
  const [currentImage,setCurrentImage]=useState(null)
  const {sendMessage}=useMessageStore();
  const fileInputRef=useRef(null);

  const removeImage=()=>{
    setCurrentImage(null)
    if(fileInputRef.current)  fileInputRef.current.value="";
  }

  const handleForm=async(e)=>{
    e.preventDefault();
    if(!currentMessage.trim() && !currentImage){
      return;
    }
    try {
      const success=await  sendMessage({
        text:currentMessage.trim(),
        image:currentImage
      })
      if(fileInputRef.current) fileInputRef.current.value=""
    setCurrentImage(null)
    setCurrentMessage("")
      
    } catch (error) {
      toast.error("error, try sending again")
    }
  }
  const handleInputImage=(e)=>{
    const file=e.target.files[0];
    
    if(!file.type.startsWith("image")){
      return toast.error("please select an image")
    }

    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setCurrentImage(reader.result)
    }
  }

  return (
    <div className="w-full  flex-col">
      {
        currentImage && (<div className="flex flex-row justify-start pl-10 pt-2">
          <div className="relative">
            <img src={currentImage} alt="image Loading.." className="size-20 rounded-sm"/>
            <IoCloseCircle className="size-5 bg-black rounded-full absolute top-0 right-0 cursor-pointer" 
            onClick={removeImage}
            />
          </div>
        </div>)
      }
      
      <div>
        <form onSubmit={handleForm} className="">
          <div className=" flex flex-row gap-4 py-2 px-2">
              <input 
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message"
              value={currentMessage}
              onChange={(e)=>{setCurrentMessage(e.target.value)}}
              type="text" />

              <input 
              type="file"
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleInputImage}
              className="hidden"
              />

              <button
              type="button"
              className={`${currentImage ? "text-emerald-500" : "text-zinc-400"}`}
              onClick={()=>{
                fileInputRef.current?.click()
              }}
              >
                <FaImage className="size-8" />
              </button>

              <button
              type="submit"
              
              >
                  <IoSendSharp className="size-9 text-zinc-400" />
              </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}
export default ChatInput