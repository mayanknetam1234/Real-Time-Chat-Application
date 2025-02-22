import express from "express"
import authRoute from "./routes/auth.routes.js";
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./db/connect.js";

dotenv.config()
const app=express();
const PORT=process.env.PORT ||5001;

//built middleware

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//application middleware
app.use(cors())
app.use("/api/auth",authRoute)





const start =async(url)=>{
    try {
        await connectDb(url);
        console.log("db is connected")
        app.listen(PORT,()=>{
            console.log(`server listening at port ${PORT}`)
        })
    } catch (error) {
        
    }
}

start(process.env.MONGO_URI)