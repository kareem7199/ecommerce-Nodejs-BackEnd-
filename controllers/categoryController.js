import CategoryService from "../services/categoryService.js";

export const CreateCategory = async (req, res) => {
    const { name } = req.body;
    const category = await CategoryService.createCategory({ name });
    res.status(201).send(category);
}