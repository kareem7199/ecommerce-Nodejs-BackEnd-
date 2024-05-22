import cartRepository from "../repositories/cartRepository.js";

const CreateCart = async (cart) => {
    await cartRepository.createOrUpdateCart(cart);
}

const GetCart = async (id) => {
    const cart = await cartRepository.getCart(id);
    return cart;
}

export default {
    CreateCart,
    GetCart
}