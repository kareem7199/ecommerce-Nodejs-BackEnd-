import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string().required().description('Product name'),
    description: Joi.string().required().description('Product description'),
    images: Joi.array().items(Joi.string()).min(1).max(6).required().description('Product images'),
    price: Joi.number().required().min(1).description('Product price'),
    inStock : Joi.number().integer().required().min(0) ,
    categoryId: Joi.string().required().description('Category ID')
}).options({ stripUnknown: true });

const validateProduct = (data) => {
    return productSchema.validate(data, { abortEarly: false });
};

export { validateProduct };
