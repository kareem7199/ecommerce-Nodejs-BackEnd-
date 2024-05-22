import boom from '@hapi/boom'
import cartService from '../services/cartService.js';
import { validateCart } from "../validators/cartValidator.js"

export const createCart = async (req, res, next) => {
    try {

        const data = validateCart(req.body);

        if (data.error) next(boom.badRequest(data.error.details.map(err => err.message)));

        await cartService.CreateCart(data.value);

        res.status(201).send({
            message: "Cart created successfully",
            data
        });

    } catch (error) {
        next(boom.internal())
    }
}

export const getCart = async (req, res, next) => {
    try {

        const cart = await cartService.GetCart(req.params.id);

        if (!cart)
            next(boom.notFound("Cart not found"));

        res.send({
            message: "Cart fetched successfully",
            data: cart
        })

    } catch (error) {
        next(boom.internal())
    }
}