import {create} from 'zustand'


const useThemeStore=create((set)=>({
    theme:localStorage.getItem("chat-theme")  || "cyberpunk",

    setTheme:(data)=>{
        set({theme:data});
        localStorage.setItem("chat-theme",data)
    }
}))

export default useThemeStore