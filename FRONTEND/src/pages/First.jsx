import { useNavigate } from "react-router-dom"

const First = () => {
    const navigate=useNavigate();
  return (
    <div className="h-full grid place-content-center">
        <button 
        className="bg-slate-500 p-1 rounded-md font-medium m-2"
        onClick={()=>{
            navigate("/signup")
        }}
        type="button">SIGN UP</button>
        <button 
         className="bg-slate-500 p-1 rounded-md font-medium m-2"
         onClick={()=>{
            navigate("/login")
        }}
        type="button">LOGIN</button>
    </div>
  )
}
export default First