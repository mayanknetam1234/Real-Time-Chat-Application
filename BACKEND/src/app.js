import express from "express"
import authRoute from "./routes/auth.routes.js";
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./db/connect.js";
import cookieParser from "cookie-parser"
import messageRoute from "./routes/message.routes.js"
import {app,io,server} from "./services/socket.io.js"
import path from "path"
dotenv.config()

const __dirname=path.resolve()

const PORT=process.env.PORT ||5001 ;

//built middleware

app.use(express.json({  }));


//application middleware
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../FRONTEND/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../FRONTEND","dist","index.html"))
    })
}



const start =async(url)=>{
    try {
        await connectDb(url);
        console.log("db is connected")
        server.listen(PORT,()=>{
            console.log(`server listening at port ${PORT}`)
        })
    } catch (error) {
        
    }
}

start(process.env.MONGO_URI)