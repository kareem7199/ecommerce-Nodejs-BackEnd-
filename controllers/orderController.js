import boom from "@hapi/boom"

import cartRepository from "../repositories/cartRepository.js"
import orderService from "../services/orderService.js"
import { validateFinalCart } from "../validators/cartValidator.js"

export const createOrder = async (req, res, next) => {

    try {

        const cart = await cartRepository.getCart(req.params.id);
        if (!cart) next(boom.notFound("Cart not found"));

        const data = validateFinalCart(cart);
        if (data.error) next(boom.badRequest(data.error.details.map(err => err.message)));

        const order = await orderService.createOrder(data.value , req.user._id);

        if(!order) return next(boom.badRequest("Order not created"));

        res.status(201).send({
            message: "Order created successfully",
            data: order
        });

    } catch (error) {
        next(boom.internal());
    }

}