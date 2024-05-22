import mongoose from "mongoose";

const Address = new mongoose.Schema({
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});

export default Address;