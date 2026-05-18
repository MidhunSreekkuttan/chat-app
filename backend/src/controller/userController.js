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

export const login = async (req, res) => { }

export const logout = async (req, res) => { }

export const deleteUser = async (req, res) => {

    try {

        const {userId} = req.body

        await UserModel.findByIdAndDelete(userId)

        res.json({ success: true, message: "user Deleted" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}