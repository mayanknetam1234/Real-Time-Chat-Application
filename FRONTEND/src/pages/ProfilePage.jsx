
import { IoIosCamera } from "react-icons/io";
import useAuthStore from "../store/useAuthStore";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
const ProfilePage = () => {
  const {isUpdatingProfile,authUser,updateProfile,setIsUpdatingProfile}=useAuthStore();
  const [inputProfile,setInputProfile]=useState(null)
  console.log("auth user",authUser)


  const handleImageUpload=(e)=>{
    const file=e.target.files[0];
    if(!file) return
    const reader=new FileReader();
    
    reader.readAsDataURL(file)

    reader.onload=async()=>{
      const base64Image=reader.result
      setInputProfile(base64Image);
      setIsUpdatingProfile(true)
      await updateProfile({profilePic:base64Image})
    }

  }
  console.log(authUser.profilePic)
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center pt-20 gap-14">
      {/* profile upload section */}
      <div className="w-[35vw]  bg-slate-500  rounded-xl py-5">
        <div className=" flex flex-col items-center  mb-4">
          {/* top */}
          <div className="text-center">
            <h2 className="font-semibold text-2xl text-slate-300">Profile</h2>
            <p className="text-slate-300 text-sm font-normal mt-2">Your profile information</p>
          </div>
          {/* avatar upload */}
          <div className="my-5 relative">
            <img src={inputProfile || authUser.profilePic || "/avatar.jpg"} alt="profile pic"  className="size-36 rounded-full"/>
        
            <label htmlFor="avatar-input" className="cursor-pointer absolute bottom-2 right-1">
            <IoIosCamera className="bg-slate-400 rounded-full size-8"/>
            <input 
            type="file" 
            id="avatar-input"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
            className="hidden" />
            
            </label>
          </div>
          {/* bottom */}
          <div>
            <p className="text-slate-300 text-sm font-normal-">
              {isUpdatingProfile?"Uploading....":"Click the camera to upload your photo"}
            </p>
          </div>
        </div>
          {/* read only info */}
          <div className="flex flex-col items-start px-2 gap-4 w-[100%]">
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="fullName" className="text-slate-300 text-sm font-normal-"><FaUser className="inline size-3 mr-2 mb-1" /><span>Full Name:</span></label>
              <input 
              className="bg-white rounded-md  w-full px-2 py-1"
              type="text" 
              value={authUser.fullName}
              name="fullName" id="fullName" disabled={true} />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="fullName" className="text-slate-300 text-sm font-normal-"><MdEmail className="inline size-4 mr-2 mb-1" /><span>Email:</span></label>
              <input 
              className="bg-white rounded-md   w-full px-2 py-1"
              type="text" 
              value={authUser.email}
              name="fullName" id="fullName" disabled={true} />
            </div>
          </div>

      </div>
      {/* account info section */}
      <div>

      </div>
      
    </div>
  )
}
export default ProfilePage