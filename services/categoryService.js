import Category from "../models/Category.js";

class CategoryService {
    async getCategories() {
        return await Category.find();
    }

    async getCategory(id) {
        return await Category.findById(id);
    }

    async createCategory(category) {
        return await Category.create(category);
    }

    async updateCategory(id, category) {
        return await Category.findByIdAndUpdate(id, category , {new : true});
    }
}

export default new CategoryService();