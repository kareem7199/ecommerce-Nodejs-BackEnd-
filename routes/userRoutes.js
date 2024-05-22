import { CreateUser , Login } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router
    .post("/register" , CreateUser)
    .post("/login" , Login)

export default router;