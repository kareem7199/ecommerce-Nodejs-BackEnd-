import express from 'express'
import {CreateCategory} from '../controllers/categoryController.js';
import uploadCategroyImage from "../middlewares/categoryImageUpload.js"

const router = express.Router();

router
    .post("/"  , uploadCategroyImage() , CreateCategory);

export default router;