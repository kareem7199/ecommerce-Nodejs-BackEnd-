import redis from '../redis/client.js';

class CartRepository {
    constructor() {
        this.client = redis.client;
    }

    async createOrUpdateCart(cart) {
        const ttlInSeconds = 60 * 60 * 24 * 30; // Set TTL to 1 month
        
        return await this.client.set(cart.id , JSON.stringify(cart) , {
            EX: ttlInSeconds
          });
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