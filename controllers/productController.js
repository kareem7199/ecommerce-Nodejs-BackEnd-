import productService from '../services/productService.js'
import boom from '@hapi/boom'
import { validateProduct } from '../validators/productValidator.js'
import { validateProductParams } from '../validators/productParamsValidator.js'

export const CreateProduct = async (req, res, next) => {
    try {

        req.body.images = req.files.map((file) => file.filename);
        const data = validateProduct(req.body);

        if(data.error) 
            next(boom.badRequest(data.error.details.map(err => err.message)))
        
        const product = await productService.createProduct(data.value);
        
        res.status(201).send(product)
    } catch (error) {
        next(boom.internal());
    }
}

export const GetProducts = async (req ,res , next) => {
    try {
        
        const data = validateProductParams(req.query);
        
        if(data.error)
            next(boom.badRequest(data.error.details.map(err => err.message)))

        const products = await productService.getProducts(req.query.page , req.query.limit , req.query.sort , req.query.category , req.query.minPrice , req.query.maxPrice);

        res.send(products)

    } catch (error) {
        next(boom.internal());
    }
}