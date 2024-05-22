import Joi from "joi";

const schema = Joi.object({
    id: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            images: Joi.array().items(Joi.string()).min(1).max(6).required(),
            price : Joi.number().min(1).required() ,
            quantity : Joi.number().integer().min(1).required()
        })
    ).required() ,
    deliveryMethod : Joi.object({
        _id : Joi.string().required() ,
        name : Joi.string().required() ,
        cost : Joi.number().min(0).required() ,
        deliveryTime : Joi.string().required()
    }).optional() ,
    address : Joi.object({
        firstName : Joi.string().required() ,
        lastName : Joi.string().required() ,
        phone : Joi.string().required() ,
        street : Joi.string().required() ,
        city : Joi.string().required() ,
        state : Joi.string().required()
    }).optional()
}).options({ stripUnknown: true });

const validateCart = (cart) => {
    return schema.validate(cart, { abortEarly: false });
}

export { 
    validateCart 
}