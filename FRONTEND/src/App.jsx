import {Navigate, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import useAuthStore from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from 'lucide-react'
import First from "./pages/First"
import Logout from "./components/Logout"
import {Toaster} from "react-hot-toast"
import useThemeStore from "./store/useThemeStore"
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore((state)=>(state))
  const {theme}=useThemeStore()

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if( isCheckingAuth && !authUser){
    return (
      <div className="h-screen grid place-content-center">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div className="h-full  " data-theme={theme}> 
        <Navbar>
        </Navbar>
        <Routes>
          <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
          <Route path="/signup" element={authUser?<Navigate to="/"/>:<SignupPage/>}/>
          <Route path="/login" element={authUser?<Navigate to="/"/>:<LoginPage/>}/>
          <Route path="/setting" element={<SettingPage/>}/>
          <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
    </div>
  )
} 
export default App