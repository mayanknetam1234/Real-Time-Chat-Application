import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import { Link } from "react-router-dom";
import {Loader} from 'lucide-react'
import { FaRegEye ,FaEyeSlash} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const LoginPage = () => {
  const {setIsLoginUp,login,isLoggingUp}=useAuthStore((state)=>(state))
  const [user,setUser]=useState({
    email:"",
    password:"",
  })
  const [showPassword,setShowPassword]=useState(false)

  const handleForm=(e)=>{
    e.preventDefault();
    setIsLoginUp(true)
    login(user);
  }

  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }
  return (
    <div className="h-full grid place-content-center ">
      <form onSubmit={handleForm} className="flex flex-col border-solid border-2 border-black rounded-md p-2 w-80 bg-slate-800">

        <h2 className="font-semibold text-2xl text-slate-300 text-center">Login</h2>
        {/* full name */}
        <div className="flex flex-col my-2">

            <label htmlFor="fullName" className="text-slate-300 text-sm font-normal- mb-1 pl-1">
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
        <div className="flex flex-col my-2 w-full">

            <label htmlFor="fullName" className="text-slate-300 text-sm font-normal- mb-1 pl-1">
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
        type="submit" disabled={isLoggingUp}>
          {isLoggingUp?(
              <div className="grid place-content-center">
              <Loader className="size-6 animate-spin"/>
            </div>
          ):(
            "Login"
          )}
        </button>
       


      </form>
      <div className="flex justify-center">
          <p className="text-base-content/60 text-black ">Don't have an account? {" "}
            <Link to='/signup' className="link link-info">
              Sign Up
            </Link>
          </p>
        </div>
    </div>
  )
}
export default LoginPage