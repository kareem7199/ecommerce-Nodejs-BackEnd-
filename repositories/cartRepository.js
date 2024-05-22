import redis from '../redis/client.js';

class CartRepository {
    constructor() {
        this.client = redis.client;
    }

    async createOrUpdateCart(cart) {
        return await this.client.set(cart.id , JSON.stringify(cart));
    }

    async getCart(id) {
        const cart = await this.client.get(id);
        return JSON.parse(cart);
    }

    async deleteCart(id) {
        await this.client.del(id);
    }
}

export default new CartRepository();