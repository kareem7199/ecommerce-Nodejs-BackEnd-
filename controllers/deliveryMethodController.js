import deliveryMethodService from "../services/deliveryMethodService.js"
import { validateDeliverMethod } from "../validators/deliveryMethodValidator.js";
import boom from "@hapi/boom";
export const createDeliveryMethod = async (req, res, next) => {
    try {

        const data = validateDeliverMethod(req.body);
        if(data.error) next(boom.badRequest(data.error.details.map(err => err.message)))
        
        const deliveryMethod = await deliveryMethodService.createDeliveryMethod(data.value);
        
        res.status(201).send({
            message : "Delivery method created successfully",
            data : deliveryMethod
        });

    } catch (error) {
        next(boom.internal);
    }
}

export const getDeliveryMethods = async (req , res , next) => {
    try {
        
        const result = await deliveryMethodService.getDeliveryMethods();

        res.send({
            message : "Delivery methods fetched successfully",
            data : result
        })

    } catch (error) {
        next(boom.internal());
    }
}