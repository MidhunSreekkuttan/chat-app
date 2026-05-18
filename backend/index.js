import express from 'express'
import dotenv from 'dotenv/config'
import dns from 'dns'

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`);
})

