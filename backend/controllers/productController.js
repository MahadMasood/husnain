const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const { category, gender, minRating, limit } = req.query;

  let query = {};
  if (category) query.category = category;
  if (gender) query.gender = gender;
  if (minRating) query.rating = { $gte: Number(minRating) };

  try {
    let productsQuery = Product.find(query);
    if (limit) {
      productsQuery = productsQuery.limit(Number(limit));
    }
    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed products from existing frontend data
// @route   POST /api/products/seed
// @access  Public (for dev purposes)
const seedProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products provided in request body' });
    }

    await Product.deleteMany(); // Clear existing products
    const createdProducts = await Product.insertMany(products);
    res.status(201).json({ message: 'Products seeded successfully', createdProducts });
  } catch (error) {
    res.status(500).json({ message: `Error seeding products: ${error.message}` });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      gender,
      colors,
      size,
      image,
      rating,
      inStock,
      isNew,
      images
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      gender,
      colors: colors || [],
      size: size || [],
      image,
      images: images || [],
      rating: rating || 0,
      inStock: inStock === undefined ? true : inStock,
      new: isNew === undefined ? false : isNew,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      gender,
      colors,
      size,
      image,
      rating,
      inStock,
      isNew,
      images
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      product.gender = gender || product.gender;
      product.colors = colors || product.colors;
      product.size = size || product.size;
      product.image = image || product.image;
      product.images = images || product.images;
      product.rating = rating || product.rating;
      if (inStock !== undefined) product.inStock = inStock;
      if (isNew !== undefined) product.new = isNew;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, getProductById, seedProducts, createProduct, updateProduct, deleteProduct };
