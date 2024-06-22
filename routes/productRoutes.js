// routes/productRoutes.js
const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  findProductsByName,
} = require('../controllers/productController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.delete('/products', deleteAllProducts);
router.get('/products/search', findProductsByName);

module.exports = router;