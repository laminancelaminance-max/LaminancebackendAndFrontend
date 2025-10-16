import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.Mongodb_URL) {
    throw new Error("Mongodb_URL is not defined in the environment variables");
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.Mongodb_URL, );
        console.log("MongoDB connected successfully");

    }catch(error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB;