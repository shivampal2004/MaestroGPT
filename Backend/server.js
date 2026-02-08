import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const app= express();
const PORT= 8080;

app.use(express.json);
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
    connectDB();
});

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected with DB");
    }  catch(err){
        console.log("Failed to connect with DB", err);
    }
}