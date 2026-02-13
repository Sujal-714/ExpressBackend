import express, { urlencoded } from "express";
import mongoose from 'mongoose';
import Product from "./models/product.model.js";
import productRoute from "./routes/product.routes.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products",productRoute);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB!'))
  .catch(()=>{
    console.log("Connection Failed");
  });

app.get('/', (req,res)=>{
    res.send("Hello from backend");
});

app.listen(port,()=>
{
    console.log(`Server running on port: ${port}`);
})