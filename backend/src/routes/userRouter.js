import express from 'express'
import { deleteUser, forgetPassword, login, logout, registration } from '../controller/userController.js'
import userAuth from '../middleware/userAuth.js'

const userRouter = express.Router()

userRouter.post("/registration", registration)
userRouter.post("/login", login)
userRouter.post("/forgetPassword", userAuth, forgetPassword)
userRouter.post("/logout", logout)
userRouter.post("/deleteUser", deleteUser)

export default userRouter