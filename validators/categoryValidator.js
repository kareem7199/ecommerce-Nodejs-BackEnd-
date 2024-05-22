import Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().required()
}).options({ stripUnknown: true });

const validateCategory = (data) => {
  return categorySchema.validate(data, { abortEarly: false });
};

export { validateCategory };
