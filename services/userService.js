import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
    async getUsers() {
        return await User.find();
    }

    async getUser(id) {
        return await User.findById(id);
    }

    async getUserByEmail(email) {
        return await User.findOne({
            email : email
        });
    }

    async logIn(email , password) {
        const user = await this.getUserByEmail(email);
        
        if(!user) {
            return null;
        }

        if(!bcryptjs.compareSync(password , user.password)) {
            return null;
        }

        return jwt.sign({userId : user._id} , process.env.JWT_SECRET);
    }

    async createUser(user) {
        user.password = bcryptjs.hashSync(user.password);
        return await User.create(user);
    }

    async updateUser(id, user) {
        return await User.findByIdAndUpdate(id, user , {new : true});
    }
}

export default new UserService();