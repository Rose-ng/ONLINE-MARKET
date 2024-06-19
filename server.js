const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection URI
const uri = 'mongodb+srv://VannaNeang:3h0peNmO9eJTuULP@marketplacecluster.xtr6cuh.mongodb.net/?retryWrites=true&w=majority&appName=MarketplaceCluster'; // Replace with your actual MongoDB connection string

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all products
app.delete('/api/products', async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: 'All products deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find products by name
app.get('/api/products/search/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const products = await Product.find({ name: new RegExp(name, 'i') });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});