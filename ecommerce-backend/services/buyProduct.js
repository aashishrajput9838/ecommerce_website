const Product = require('../models/Product');

/**
 * Buys a product: decrements stock if available and returns an order summary.
 */
const buyProduct = async ({ productId, quantity }) => {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
    }
    if (product.stock < quantity) {
        const error = new Error('Insufficient stock');
        error.status = 400;
        throw error;
    }

    product.stock -= quantity;
    await product.save();

    return {
        productId: product.id,
        name: product.name,
        quantity,
        total: product.price * quantity,
        orderId: `order_${Date.now()}`,
        status: 'confirmed'
    };
};

module.exports = { buyProduct };