import useAuthStore from "../store/useAuthStore"
import { CiLogout } from "react-icons/ci";
const Logout = () => {
    const {logout}=useAuthStore((state)=>(state));
    const handleLogout=()=>{
        logout();
    }
  return (
    <div>
        <button type="button" onClick={handleLogout}  className="bg-slate-500 p-1 rounded-md font-medium m-2"><CiLogout className="size-6"/></button>
    </div>
  )
}
export default Logout