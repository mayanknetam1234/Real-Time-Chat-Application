import { useState } from "react";
import { FaRegEye ,FaEyeSlash} from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import {Loader} from 'lucide-react'
import toast from "react-hot-toast";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
const SignupPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [user,setUser]=useState({
    fullName:"",
    email:"",
    password:"",
  })
  const {isSigningUp,signUp,setIsSigningUp}=useAuthStore((state)=>(state))
  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }
  
  const validateForm=()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     
    if(!user.fullName.trim()) return toast.error("Please provide the name")
    if(!user.email.trim()) return toast.error("please provide email")
    if(!emailRegex.test(user.email)) return toast.error("please provide valid email")
    if(!user.password) return toast.error("please provide the password")
    if(user.password.length<6) return toast.error("password must be of length 6")
    return true;
  }

  const handleForm=(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success){
      setIsSigningUp(true)
      signUp(user)  
    }
  }
 
    return  (
        <div className="h-full grid place-content-center ">
          <form onSubmit={handleForm} className="flex flex-col border-solid border-2 border-black rounded-md p-2 w-80 bg-slate-800">
    
            <h2 className="font-semibold text-2xl text-slate-300 text-center">Sign Up</h2>
           {/* fullname */}
            <div className="flex flex-col my-2">
    
              <label htmlFor="fullName" className="text-slate-300 text-sm font-normal- mb-1 pl-1">
              <FaUser className="inline size-4 mr-2 mb-1" />
              <span>Full Name:</span>
              </label>
              <input 
              value={user?.fullName}
              onChange={(e)=>{
                setUser({...user,fullName:e.target.value})
              }}
              className="border-solid border-2 border-slate-600 rounded-md px-2"
              name="email"
              placeholder="Enter full name"
              type="text" />

            </div>
              {/* email */}
            <div className="flex flex-col my-2">
    
                <label htmlFor="email" className="text-slate-300 text-sm font-normal- mb-1 pl-1">
                <MdEmail className="inline size-4 mr-2 mb-1" />
                <span>Email:</span>
                </label>
                <input 
                value={user?.email}
                onChange={(e)=>{
                  setUser({...user,email:e.target.value})
                }}
                className="border-solid border-2 border-slate-600 rounded-md px-2"
                name="email"
                placeholder="Enter email"
                type="email" />
    
            </div>
             
             {/* password */}
            <div className="flex flex-col my-2 w-full">
    
                <label htmlFor="password" className="text-slate-300 text-sm font-normal- mb-1 pl-1">
                <RiLockPasswordFill className="inline size-4 mr-2 mb-1" />
                <span>Password:</span>
                </label>
                <div className="relative w-full"> 
                  <input 
                  value={user?.password}
                  className="border-solid border-2 border-slate-600 rounded-md w-full px-2"
                  name="password"
                  onChange={(e)=>{
                    setUser({...user,password:e.target.value})
                  }}
                  placeholder="Enter password"
                  type={showPassword?"text":"password"} />
                  <button type="button" onClick={handleShowPassword} className=" p-0 absolute right-1 top-1">
                    {!showPassword?<FaRegEye className="size-5 mr-1"/>:<FaEyeSlash className="size-5 mr-1" />}
                  </button>
                </div>
    
            </div>
    
           
            
    
    
            <button 
            className="bg-slate-500 p-1 rounded-md font-medium m-2"
            type="submit" disabled={isSigningUp}>
              {isSigningUp?(
                  <div className="grid place-content-center">
                  <Loader className="size-6 animate-spin"/>
                </div>
              ):(
                "Sign Up"
              )}
            </button>
           
    
    
          </form>
          <div className="flex justify-center">
              <p className="text-base-content/60 text-black ">Already have an account? {" "}
                <Link to='/login' className="link link-info">
                  Sign In
                </Link>
              </p>
            </div>
        </div>
      )
  
}
export default SignupPage