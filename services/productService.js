import Product from "../models/Product.js";

class ProductService {
    async createProduct(product) {
        return await Product.create(product);
    }
}

export default new ProductService();