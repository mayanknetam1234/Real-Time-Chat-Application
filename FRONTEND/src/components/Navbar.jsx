import Logout from "./Logout"
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom"
import { LuMessageSquareCode } from "react-icons/lu";
import useAuthStore from "../store/useAuthStore";
import Setting from "./SettingIcon";
import ProfileIcon from "./ProfileIcon";
const Navbar = () => {
  const location=useLocation();
  const {authUser}=useAuthStore()
  return (
    <header className="flex flex-row  border-solid border-2 ">
      <div className="basis-1/2 ">
      <Link to="/" className="flex flex-row" >  <LuMessageSquareCode className="size-12"/>
      <p className="font-bold mt-2 text-lg">CHATTY</p></Link>
      </div>
      <div className="basis-1/2 flex flex-row-reverse space-x-5 space-x-reverse">
      {authUser?<Logout></Logout>:""}
      {authUser && location.pathname!="/profile"?<ProfileIcon></ProfileIcon>:""}
      <Setting></Setting>
      </div>
  
       
    </header>
  )
}
export default Navbar