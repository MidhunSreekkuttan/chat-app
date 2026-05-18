import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {

    try {

        const { userLogin } = req.cookies
        if (!userLogin) {
            res.json({ success: false, message: "Not Autherised login again" })
        }

        const verifyToken = await jwt.verify(userLogin, process.env.JWT_SECRET)
        if (!verifyToken) {
            res.json({ success: false, message: "something wend wrong plz login again" })
        }

        if (verifyToken.id) {
            req.userId = verifyToken.id
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export default userAuth