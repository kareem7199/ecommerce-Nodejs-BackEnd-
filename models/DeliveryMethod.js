import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
    } ,
});

const DeliveryMethod = mongoose.model("DeliveryMethod", schema);

export default DeliveryMethod