import nodemailer from 'nodemailer'

const sendingMaile = nodemailer.createTransport({

    service: "gmail",
    auth: {
        user: process.env.NO_REPLAY_EMAIL,
        pass: process.env.NO_REPLAY_PASSWORD
    }

})

export default sendingMaile