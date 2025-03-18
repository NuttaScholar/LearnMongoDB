import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

/*********************************************** */
// Instance 
/*********************************************** */
const app = express();

/*********************************************** */
// Config
/*********************************************** */
const PORT = 5000;

/*********************************************** */
// Middleware Setup
/*********************************************** */
// อนุญาตให้ React frontend สามารถส่งคำขอมาได้
app.use(cors());

/*********************************************** */
// Mongoose Setup
/*********************************************** */
// เชื่อมต่อ MongoDB
mongoose.connect("mongodb://root:example@localhost:27017/Test?authSource=admin");

// กำหนด Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// สร้าง Model
const User = mongoose.model("user", userSchema);
/*********************************************** */
// Routes Setup
/*********************************************** */
const newUser = new User({ name: "Alice", age: 25 });
newUser.save().then(() => console.log("User added!"));
/*********************************************** */
// Start Server
/*********************************************** */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});