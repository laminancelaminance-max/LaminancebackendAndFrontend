import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL, );
        console.log("MongoDB connected successfully");

    }catch(error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB;