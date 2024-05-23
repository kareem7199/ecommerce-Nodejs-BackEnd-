import Order from '../models/Order.js'
import productService from './productService.js'
import deliveryMethodService from './deliveryMethodService.js'
import paymentService from './paymentService.js'

const createOrder = async (cart, userId) => {

    // TODO: decrease inStock
    // TODO: delete cart

    const products = [];
    let totalPrice = 0;

    for (const item of cart.items) {
        const product = await productService.getProduct(item._id);

        if (!product || product.inStock < item.quantity) return null;

        products.push({
            ...product.toObject(), // Convert Mongoose document to plain JavaScript object
            quantity: item.quantity
        });

        totalPrice += (item.quantity * product.price);
    }

    if(cart?.items?.length !== products.length) return null;

    const deliveryMethod = await deliveryMethodService.getDeliveryMethod(cart.deliveryMethod._id);
    
    if (!deliveryMethod) return null;

    totalPrice += deliveryMethod.cost;

    const address = cart.address;

    const paymentIntent = await paymentService.createPaymentIntent(totalPrice * 100);

    if(!paymentIntent) return null;

    const order = await Order.create({
        userId,
        products,
        deliveryMethod,
        address,
        paymentIntentId : paymentIntent ,
        products ,
        total : totalPrice
    })

    if(!order) return null;

    return order;
}

export default {
    createOrder
}