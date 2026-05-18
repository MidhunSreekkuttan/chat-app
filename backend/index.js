import express from 'express'
import dotenv from 'dotenv/config'
import dns from 'dns'
import path from 'path'

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express()

const PORT = process.env.PORT || 3000

//make ready for deployment
const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}
//...........................

app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`);
})

