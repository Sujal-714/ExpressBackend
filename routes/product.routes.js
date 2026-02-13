import express from "express";
import Product from "../models/product.model.js";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct,} from "../controllers/product.controller.js"
const router = express.Router();



router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',addProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


export default router;