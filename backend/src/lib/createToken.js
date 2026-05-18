import jwt from 'jsonwebtoken'

export const registrationToken = async (userId, res) => {

    try {

        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET)

        res.cookie("userRegistration", token, {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production" ? true : false
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const loginToken = async (userId, res) => {

    try {

        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET)

        res.cookie("UserLogin", token, {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production" ? true : false
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}