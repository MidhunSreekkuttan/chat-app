import mongoose from 'mongoose'

const connectDB = async (req, res) => {
    await mongoose.connect(process.env.MOGODB_URL)
    console.log("Data base is connected");
}

export default connectDB