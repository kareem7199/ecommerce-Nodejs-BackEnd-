import User from "../models/User.js";
import bcryptjs from 'bcryptjs';

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

    async createUser(user) {
        user.password = bcryptjs.hashSync(user.password);
        return await User.create(user);
    }

    async updateUser(id, user) {
        return await User.findByIdAndUpdate(id, user , {new : true});
    }
}

export default new UserService();