import express from 'express'
import dotenv from 'dotenv/config'
import dns from 'dns'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectDB from './lib/connectDB.js'
import userRouter from './routes/userRouter.js'

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express()

const PORT = process.env.PORT || 3000

//midleware
app.use(express.json())
app.use(cookieParser())

//api end points
app.use("/api/user", userRouter) // api end point for user

//make ready for deployment
const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}
//...........................

await connectDB()

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})