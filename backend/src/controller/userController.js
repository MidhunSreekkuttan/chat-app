import cloudinary from "../lib/cloudinary.js"
import { loginToken, registrationToken } from "../lib/createToken.js"
import forgetPasswordOtp from "../lib/email-templates/forgetPasswordOtpEmail.js"
import welcomeMail from "../lib/email-templates/welcomeEmail.js"
import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'

export const registration = async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "You must enter all input field" })
        }

        // Email validation

        if (!validator.isEmail(email, {
            allow_underscores: false,
            allow_utf8_local_part: false,
            host_whitelist: ["gmail.com", "outlook.com"],
        })) {
            return res.json({ success: false, message: "Invalid Email" })
        }

        // Password validation
        if (password.length < 8) {
            return res.json({ success: false, message: "Password Must have 8 charectors" })
        }
        if (!/[A-Z]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one upperCase charector" })
        }
        if (!/[a-z]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one lowerCase charector" })
        }
        if (!/[0-9]/.test(password) || password.match(/[0-9]/g).length < 3) {
            return res.json({ success: false, message: "Password must have alteast three numbers" })
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one symbol" })
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
        if (!email || !password) {
            return res.json({ success: false, message: "Fill entaire fields" })
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

        const { email } = req.body

        const user = await UserModel.findOne({ email })
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

        const { email, otp, password } = req.body

        // Password validation
        if (password.length < 8) {
            return res.json({ success: false, message: "Password Must have 8 charectors" })
        }
        if (!/[A-Z]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one upperCase charector" })
        }
        if (!/[a-z]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one lowerCase charector" })
        }
        if (!/[0-9]/.test(password) || password.match(/[0-9]/g).length < 3) {
            return res.json({ success: false, message: "Password must have alteast three numbers" })
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return res.json({ success: false, message: "Password must have alteast one symbol" })
        }

        if (!otp) {
            return res.json({ success: false, message: "plz enter Otp" })
        }

        if (!password) {
            return res.json({ success: false, message: "Plz enter Password" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await UserModel.findOne({ email })
        if (!user) {
            res.json({ success: false, message: "user not found" })
        }

        if (otp !== user.verifyOtp) {
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

export const updateProfile = async (req, res) => {

    try {

        const userId = req.userId

        if (!req.file) {
            return res.json({ success: false, message: "You Must privide a Profile Pic" })
        }

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

        const upload = await streamUpload(req.file.buffer)

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        user.profilePic = upload.secure_url

        await user.save()

        res.json({ success: true, message: "Profile Updated", image: upload.secure_url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const authUser = async (req, res) => {

    try {

        const userId = req.userId

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        res.json({
            success: true, userData: {
                id: user._id,
                name: user.name,
                profilePic: user.profilePic
            }
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}