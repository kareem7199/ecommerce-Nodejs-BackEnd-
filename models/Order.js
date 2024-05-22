import mongoose from "mongoose";
import Product from './Product.js'
import DeliveryMethod from './DeliveryMethod.js'
import Address from "./Address.js"

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [Product],
        required: true
    },
    deliveryMethod: {
        type: DeliveryMethod,
        required: true
    },
    address: {
        type: Address,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    } ,
    paymentIntentId: {
        type: string,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});