import express from "express"

import {
    createOrder
} from "../controllers/orderController.js"

import verifyUser from "../middlewares/verifyUser.js"

const router = express.Router();

router
    .post("/:id" , verifyUser , createOrder)

export default router;