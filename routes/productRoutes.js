import express from 'express'
import uploadImages from '../middlewares/productImagesUpload.js';
import {CreateProduct , GetProducts , GetProduct} from '../controllers/productController.js'
const router = express.Router();

router
    .get("/" , GetProducts)
    .get("/:id" , GetProduct)
    .post("/" , uploadImages() , CreateProduct);

export default router;