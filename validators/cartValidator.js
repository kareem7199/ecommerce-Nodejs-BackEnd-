import Joi from "joi";

const schema = Joi.object({
    id: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            images: Joi.array().items(Joi.string()).min(1).max(6).required(),
            price : Joi.number().min(1).required() ,
            quantity : Joi.number().integer().min(1).required()
        })
    ).required()
}).options({ stripUnknown: true });

const validateCart = (cart) => {
    return schema.validate(cart, { abortEarly: false });
}

export { 
    validateCart 
}