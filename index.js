import express from "express";
import mongoose from 'mongoose';
import Product from "./models/product.model.js";
const app = express();
const port = 3000;


app.use(express.json());

mongoose.connect('mongodb+srv://downhills316_db_user:tc34QScA7bIlXmuI@nodebackend.kplrxsd.mongodb.net/backend?appName=NodeBackend')
  .then(() => console.log('Connected to mongoDB!'))
  .catch(()=>{
    console.log("Connection Failed");
  });

app.get('/', (req,res)=>{
    res.send("Hello from backend");
});

app.get('/api/products',async (req,res)=>{
try {
    const products = await Product.find();
    res.status(200).json(products);
} catch (error) {
    res.status(500).json({message: error.message});
    
}
});

app.post('/api/products',async (req,res)=>
{
try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
} catch (error) {
    res.status(500).json({message: error.message});
    
}
});
app.get('/api/product/:id',async (req,res)=>
{
try {
    const id = req.params.id;
    console.log(id);
    
    const product = await Product.findById(id);
    res.status(200).json(product);
} catch (error) {
    res.status(500).json({message: error.message});
    
}
});

app.put('/api/product/:id',async (req,res)=>
{
try {
    const id = req.params.id;
    console.log(id);
    
    const product = await Product.findByIdAndUpdate(id,req.body);

    if(!product){
        return res.status(200).json({message: "Product not found"}); 
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
} catch (error) {
    res.status(500).json({message: error.message});
    
}
});
app.delete('/api/product/:id',async (req,res)=>
{
try {
    const id = req.params.id;
    console.log(id);
    
    const product = await Product.findByIdAndDelete(id);

    if(!product){
        return res.status(200).json({message: "Product not found"}); 
    }
    const deletedProduct = await Product.findById(id);
    res.status(200).json({message: "Product deleted successfully"});
} catch (error) {
    res.status(500).json({message: error.message});
}
});

app.listen(port,()=>
{
    console.log(`Server running on port: ${port}`);
})