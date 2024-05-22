import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required() ,
  cost: Joi.number().min(0).required() ,
  deliveryTime: Joi.string().required() 
}).options({ stripUnknown: true });

const validateDeliverMethod = (data) => {
  return schema.validate(data, { abortEarly: false });
};

export { validateDeliverMethod };
