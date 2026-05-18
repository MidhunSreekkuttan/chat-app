import express from 'express'
import { deleteUser, login, logout, registration } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post("/registration", registration)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.post("/deleteUser", deleteUser)

export default userRouter