const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');
const { authMiddleware, vendorMiddleware } = require('../middleware/auth');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, vendorMiddleware, createProduct);

module.exports = router;
