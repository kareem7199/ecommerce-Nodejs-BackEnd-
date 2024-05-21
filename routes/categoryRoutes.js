import express from 'express'
import {CreateCategory} from '../controllers/categoryController.js';

const router = express.Router();

router.post("/" , CreateCategory);

export default router;