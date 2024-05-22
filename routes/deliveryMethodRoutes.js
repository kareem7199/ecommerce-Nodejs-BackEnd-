import express from 'express'

import {
    createDeliveryMethod,
    getDeliveryMethods
} from '../controllers/deliveryMethodController.js'


const router = express.Router();

router
    .get("/" , getDeliveryMethods)
    .post("/" , createDeliveryMethod)

export default router;