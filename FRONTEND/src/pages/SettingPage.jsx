import { THEME } from "../constants"
import useThemeStore from "../store/useThemeStore"

const SettingPage = () => {
  const {theme,setTheme}=useThemeStore();
  return (
    <div className=" h-screen pt-5  flex flex-col items-center"> 
      <div className=" w-[75%]">
        <h1>THEMES</h1>
        <p>Click the icon to set the theme</p>
      </div>
      <div className=" w-[75%] py-5 px-24">
        <div className="grid grid-cols-4 gap-3">
          {THEME.map((t)=>(
            <button 
            key={t} 
            type="button"
           
            className={theme==t?"h-10 w-48 border-black  border-dashed border-2 p-1 rounded-md":"h-10 w-48  border-solid border-2 rounded-md hover:border-4 hover:border-white p-1 bg-slate-500"}
            onClick={()=>(setTheme(t))}
            >
                  <p 
                  className="rounded-md"
                   data-theme={t} >{t.toUpperCase()}</p>
            </button> 
          ))}

        </div>
      </div>
    </div>
  )
}
export default SettingPage