const express = require('express');
const router = express.Router();

const { buyProduct } = require('../controllers/buyProduct');
const Product = require('../models/Product');

router.post('/buy/:id', buyProduct);

// Create a product
router.post('/products', async (req, res) => {
    try {
        const { name, price, stock } = req.body || {};
        if (!name || price == null || stock == null) {
            return res.status(400).json({ message: 'name, price, stock are required' });
        }
        const product = await Product.create({ name, price, stock });
        res.status(201).json(product);
    } catch (err) {
        console.error('Create product error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// List products
router.get('/products', async (_req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error('List products error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
