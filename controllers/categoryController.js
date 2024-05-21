import CategoryService from "../services/categoryService.js";
import boom from '@hapi/boom'

export const CreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.createCategory({ name });
        res.status(201).send(category);
    } catch (error) {
        next(boom.internal());
    }
}