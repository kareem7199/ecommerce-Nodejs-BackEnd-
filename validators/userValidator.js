import Joi from 'joi';

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$')) // Password pattern: alphanumeric characters, minimum length of 8
        .required()
        .messages({
            'string.pattern.base': 'Password must contain only alphanumeric characters',
            'string.empty': 'Password is required'
        })
}).options({ stripUnknown: true });

const validateUser = (data) => {
    return userSchema.validate(data, { abortEarly: false });
};

export { validateUser };