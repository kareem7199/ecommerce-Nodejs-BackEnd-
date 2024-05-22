import express from 'express'
import uploadImages from '../middlewares/productImagesUpload.js';
import {CreateProduct , GetProducts} from '../controllers/productController.js'
const router = express.Router();

router
    .get("/" , GetProducts)
    .post("/" , uploadImages() , CreateProduct);

export default router;