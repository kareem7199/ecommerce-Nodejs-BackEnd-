import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const Address = new mongoose.Schema({
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index : true ,
        unique : true ,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: {
        type: [Address]
    }
});

schema.plugin(uniqueValidator);

const User = mongoose.model("User", schema);

export default User;