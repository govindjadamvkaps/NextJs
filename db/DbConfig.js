import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connection successfully.....")

    } catch (error) {
        console.log("error in database connection....")
        console.log(error)
    }
}

export default connectDb;