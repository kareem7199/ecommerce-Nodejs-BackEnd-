import productService from '../services/productService.js';
import boom from '@hapi/boom'
import { validateProduct } from '../validators/productValidator.js';
export const CreateProduct = async (req, res, next) => {
    try {

        req.body.images = req.files.map((file) => file.filename);
        const data = validateProduct(req.body);

        if(data.error) {
            next(boom.badRequest(data.error.details.map(err => err.message)))
        }
        
        const product = await productService.createProduct(data.value);
        
        res.status(201).send(product)
    } catch (error) {
        next(boom.internal());
    }
}