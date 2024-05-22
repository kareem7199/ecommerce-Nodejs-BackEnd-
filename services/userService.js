import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUsers = () => User.find();

const getUser = id => User.findById(id);

const getUserByEmail = email => User.findOne({email});

const logIn = (email, password) => {
    return getUserByEmail(email).then(user => {
        if(!user) return null;
        if(!bcryptjs.compareSync(password, user.password)) return null;
        return jwt.sign({userId : user._id}, process.env.JWT_SECRET);
    });
}

const createUser = user => {
    user.password = bcryptjs.hashSync(user.password);
    return User.create(user);
}

const updateUser = (id, user) => User.findByIdAndUpdate(id, user, {new : true});

export default {
    getUser,
    getUsers,
    getUserByEmail,
    logIn,
    createUser,
    updateUser
}