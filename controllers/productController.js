// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).send({ message: 'All products deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Find products by name
exports.findProductsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({ name: new RegExp(name, 'i') }); // 'i' for case-insensitive search
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};