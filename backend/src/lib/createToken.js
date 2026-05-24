import jwt from 'jsonwebtoken'

export const registrationToken = async (userId, res) => {

    try {

        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET)

        res.cookie("userRegistration", token, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 5 * 24 * 60 * 60 * 1000
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const loginToken = async (userId, res) => {

    try {

        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET)

        res.cookie("userLogin", token, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 5 * 24 * 60 * 60 * 1000
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}