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
        type: [{
            name : String,
            images: [String] ,
            price: Number,
            quantity: Number
        }],
        required: true
    },
    deliveryMethod: {
        type: {
            name: {
                type: String,
                required: true
            } ,
            cost: {
                type: Number,
                required: true
            } ,
            deliveryTime: {
                type: String,
                required: true
            } 
        } ,
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
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", schema);

export default Order