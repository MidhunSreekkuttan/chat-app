import express from 'express'
import { getAllContacts, getChatPartners, getMessagesByuserId, sendMessage } from '../controller/messageController.js'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'

const messageRouter = express.Router()

messageRouter.get("/contacts", userAuth, getAllContacts)
messageRouter.get("/chats", userAuth, getChatPartners)
messageRouter.get("/:id", userAuth, getMessagesByuserId)
messageRouter.post("/send/:id", userAuth, upload.single("image"), sendMessage)

export default messageRouter