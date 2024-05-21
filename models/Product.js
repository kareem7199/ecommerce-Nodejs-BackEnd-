import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    } ,
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
})

const Product = mongoose.model("Product", schema);

export default Product;