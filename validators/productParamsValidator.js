import Joi from "joi";

const schema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('asc', 'desc').optional(),
    category: Joi.string().allow('').optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().when('minPrice', {
        is: Joi.number().required(),
        then: Joi.number().min(Joi.ref('minPrice')).optional(),
        otherwise: Joi.number().optional()
    }) ,
    name : Joi.string().optional()
});

const validateProductParams = (data) => {
    return schema.validate(data, { abortEarly: false });
};

export { validateProductParams };