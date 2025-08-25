const { buyProduct: buyProductService } = require('../services/buyProduct');

const buyProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { quantity = 1 } = req.body || {};

        if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
        }
        if (Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number' });
        }

        const result = await buyProductService({ productId, quantity: Number(quantity) });
        return res.status(200).json({ message: 'Purchase successful', result });
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        if (status >= 500) {
            console.error('Error in buyProduct controller:', error);
        }
        return res.status(status).json({ message });
    }
};

module.exports = { buyProduct };