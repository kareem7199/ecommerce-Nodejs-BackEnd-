import { CreateUser } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router
    .post("/register" , CreateUser);

export default router;