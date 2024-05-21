import express from 'express'
import uploadImages from '../middlewares/productImagesUpload.js';
import {CreateProduct} from '../controllers/productController.js'
const router = express.Router();

router
    .post("/" , uploadImages() , CreateProduct);

export default router;