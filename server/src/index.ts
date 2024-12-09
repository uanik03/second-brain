import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import cors from "cors"

import userRouter from "./routes/user"
import contentRouter from "./routes/content"



const app = express()
const port = 8080
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/content", contentRouter)



app.listen(port,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log(`server running on port ${port}`)
        
    } catch (error) {
        console.log("Something went wrong")
    }
})