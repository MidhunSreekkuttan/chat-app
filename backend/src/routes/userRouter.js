import express from 'express'
import { authUser, deleteUser, forgetPassword, login, logout, registration, sendOtp, updateProfile } from '../controller/userController.js'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post("/registration", registration)
userRouter.post("/login", login)
userRouter.post("/sendOtp", userAuth, sendOtp)
userRouter.post("/forgetPassword", userAuth, forgetPassword)
userRouter.post("/logout", logout)
userRouter.post("/deleteUser", deleteUser)
userRouter.put("/updateProfile", userAuth, upload.single("profilePic"), updateProfile)

userRouter.get("/userAuth", userAuth, (_, res) => { res.json({ success: true }) })

userRouter.get("/userData", userAuth, authUser)

export default userRouter