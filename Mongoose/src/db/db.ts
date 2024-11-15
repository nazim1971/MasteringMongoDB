import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();



const uri  = process.env.DATABASE_URL;

if (!uri) {
    throw new Error("MongoDB URI is not defined in the environment variables");
  }

async function connectDB() {
    try {
      await mongoose.connect(uri!); 
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
     
    }
  }
  
export default connectDB;