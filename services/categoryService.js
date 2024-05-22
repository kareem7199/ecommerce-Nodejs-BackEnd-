import Category from "../models/Category.js";

const getCategories = () => Category.find();

const getCategory = id => Category.findById(id);

const createCategory = category => Category.create(category);

const updateCategory = (id, category) => Category.findByIdAndUpdate(id, category, { new: true });

export default {
    getCategories,
    getCategory,
    createCategory,
    updateCategory
}