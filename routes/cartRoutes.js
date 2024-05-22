import express from 'express'
import boom from '@hapi/boom'
import {
    createCart ,
    getCart
} from '../controllers/cartController.js'

const router = express.Router();

router
    .get("/:id" , getCart)
    .post("/" , createCart);

export default router;