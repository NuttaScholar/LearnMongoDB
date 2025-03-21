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
app.use(express.json());

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
const transatcionSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  amount: Number,
});

// สร้าง Model
const User = mongoose.model("user", userSchema);
const Transatcion = mongoose.model("Transaction", transatcionSchema);
/*********************************************** */
// Routes Setup
/*********************************************** */
app.post('/User', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save().then(() => console.log("User added!"));
    res.send("Message received!");
  } catch (err) {
    res.send({ Error: err });
  }
})
app.post('/Transaction', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newTransatcion = new Transatcion(req.body);
    await newTransatcion.save().then(() => console.log("Transatcion added!"));
    res.send("Message received!");
  } catch (err) {
    res.send({ Error: err });
  }
})
app.get('/User', async (req: Request, res: Response) => {
  User.find().then((data) => {
    res.send(data);
  })
})
app.get('/Transaction', async (req: Request, res: Response) => {
  Transatcion.find().populate("userid").limit(10).then((data) => {
    res.send(data);
  })
})
app.delete('/User', async (req: Request, res: Response) => {
  User.deleteOne({ _id: req.body._id }).then((result) => {
    console.log(`count: ${result.deletedCount}, acknowledged: ${result.acknowledged}`)
    res.send(result);
  })
})
app.delete('/Transaction', async (req: Request, res: Response) => {
  console.log(`id: ${req.query._id}`)
  Transatcion.deleteOne({ _id: req.query._id }).then((result) => {
    console.log(`count: ${result.deletedCount}, acknowledged: ${result.acknowledged}`)
    res.send(result);
  })
})
app.put('/User', async (req: Request, res: Response) => {
  User.updateOne({ _id: req.query._id }, req.body).then((result) => {
    res.send(result);
  })
})
app.put('/Transaction', async (req: Request, res: Response) => {
  Transatcion.updateOne({ _id: req.query._id }, req.body).then((result) => {
    res.send(result);
  })
})

/*********************************************** */
// Start Server
/*********************************************** */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});