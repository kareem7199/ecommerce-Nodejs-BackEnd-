import productService from '../services/productService.js';
import boom from '@hapi/boom'

export const CreateProduct = async (req, res, next) => {
    try {
        const images = req.files.map((file) => file.filename);
        const product = await productService.createProduct({...req.body , images});
        
        res.status(201).send(product)
    } catch (error) {
        next(boom.internal());
    }
}