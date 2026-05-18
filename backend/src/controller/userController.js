import { loginToken, registrationToken } from "../lib/createToken.js"
import forgetPasswordOtp from "../lib/email-templates/forgetPasswordOtpEmail.js"
import welcomeMail from "../lib/email-templates/welcomeEmail.js"
import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'

export const registration = async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!name, !email, !password) {
            res.json({ success: false, message: "You must enter all input field" })
        }

        const existUser = await UserModel.findOne({ email })
        if (existUser) {
            return res.json({ success: false, message: "user already existed" })
        }

        const hasPassword = await bcrypt.hash(password, 10)

        const user = await UserModel({
            name,
            email,
            password: hasPassword
        })

        try {

            await registrationToken(user._id, res)

            await welcomeMail(user.name, user.email)

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }

        await user.save()

        res.json({ success: true, message: "User Registered" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body
        if (!email, !password) {
            res.json({ success: false, message: "Fill entaire fields" })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const verifypass = await bcrypt.compare(password, user.password)
        if (!verifypass) {
            return res.json({ success: false, message: "Incorrect password" })
        }

        await loginToken(user._id, res)

        res.json({ success: true, message: "User loggedIn" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const sendOtp = async (req, res) => {

    try {

        const userId = req.userId

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        user.verifyOtp = OTP

        await user.save()
        await forgetPasswordOtp(OTP, user.email)

        res.json({ success: true, message: "Otp send" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const forgetPassword = async (req, res) => {

    try {

        const userId = req.userId
        const { otp, password } = req.body

        if (!otp) {
            return res.json({ success: false, message: "plz enter Otp" })
        }

        if (!password) {
            return res.json({ success: false, message: "Plz enter Password" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await UserModel.findById(userId)
        if (!user) {
            res.json({ success: false, message: "user not found" })
        }

        if (otp != user.verifyOtp) {
            return res.json({ success: false, message: "Otp is incorrect" })
        }
        user.password = hashPass
        user.verifyOtp = ""

        await user.save()

        res.json({ success: true, message: "Password updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const logout = async (_, res) => {

    try {

        res.clearCookie("userLogin", {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production" ? true : false
        })

        res.json({ success: true, message: "User logged Out" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const deleteUser = async (req, res) => {

    try {

        const { userId } = req.body

        await UserModel.findByIdAndDelete(userId)

        res.json({ success: true, message: "user Deleted" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}