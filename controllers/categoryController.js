import CategoryService from "../services/categoryService.js";
import { validateCategory } from "../validators/categoryValidator.js";
import boom from '@hapi/boom'

export const CreateCategory = async (req, res, next) => {
    try {

        req.body.image = req.file.filename;

        const data = validateCategory(req.body);

        if(data.error) {
            next(boom.badRequest(data.error.details.map(err => err.message)))
        }
        
        const category = await CategoryService.createCategory(data.value);

        res.status(201).send(category);
    } catch (error) {
        next(boom.internal());
    }
}
