import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import Address from './Address.js'

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