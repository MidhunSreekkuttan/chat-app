import MessageModel from "../model/messageModel.js";
import UserModel from "../model/userModel.js";
import cloudinary from "../lib/cloudinary.js"

export const getAllContacts = async (req, res) => {

    try {

        const loggedUserId = req.userId

        const filteredUsers = await UserModel.find({ _id: { $ne: loggedUserId } }).select("-password")

        res.json({ success: true, filteredUsers })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const getChatPartners = async (req, res) => {

    try {

        const loggedUserId = req.userId

        const messages = await MessageModel.find({
            $or: [{ senderId: loggedUserId }, { receiverId: loggedUserId }]
        })

        const chatPartnersId = [
            ...new Set(
                messages.map(msg => msg.senderId.toString() === loggedUserId.toString() ? msg.receiverId.toString()
                    : msg.senderId.toString())
            )
        ]

        const chatPartners = await UserModel.find({ _id: { $in: chatPartnersId } }).select("-password")

        res.json({ success: true, chatPartners })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const getMessagesByuserId = async (req, res) => {

    try {

        const myId = req.userId
        const { id: usertoChatId } = req.params

        const messages = await MessageModel.find({
            $or: [
                { senderId: myId, receiverId: usertoChatId },
                { senderId: usertoChatId, receiverId: myId }
            ]
        })

        res.json({ success: true, messages })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const sendMessage = async (req, res) => {

    try {

        const { text } = req.body
        const senderId = req.userId
        const { id: receiverId } = req.params

        let upload
        let secureUrl

        if (req.file) {

            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "profiles" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    stream.end(buffer);
                });
            };

            upload = await streamUpload(req?.file?.buffer)
            secureUrl = upload.secure_url
        }

        const message = await MessageModel.create({
            senderId,
            receiverId,
            text,
            image: secureUrl ? secureUrl : ""
        })

        res.json({ success: true, message })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}