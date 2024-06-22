const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

// Routes
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to DressStore application." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});