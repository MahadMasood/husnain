const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
  { name: 'Oversized Streetwear Hoodie', category: 'Hoodies', size: ['S', 'M', 'L', 'XL'], price: 89, rating: 4.7, inStock: true, colors: ['Black', 'White', 'Red'], gender: 'Unisex', image: '/hero/hero1.jpg', new: true },
  { name: 'Distressed Denim Jacket', category: 'Jackets', size: ['M', 'L', 'XL'], price: 129, rating: 4.8, inStock: true, colors: ['Blue', 'Black'], gender: 'Unisex', image: '/hero/hero2.jpg', new: false },
  { name: 'Cargo Pants', category: 'Pants', size: ['S', 'M', 'L', 'XL', 'XXL'], price: 79, rating: 4.5, inStock: false, colors: ['Olive', 'Black', 'Khaki'], gender: 'Men', image: '/hero/hero3.jpg', new: false },
  { name: 'Classic Graphic Tee', category: 'T-Shirts', size: ['XS', 'S', 'M', 'L', 'XL'], price: 39, rating: 4.3, inStock: true, colors: ['Black', 'White', 'Gray'], gender: 'Unisex', image: '/hero/hero1.jpg', new: true },
  { name: 'Cropped Leather Jacket', category: 'Jackets', size: ['S', 'M', 'L'], price: 199, rating: 4.9, inStock: true, colors: ['Black', 'Brown'], gender: 'Women', image: '/hero/hero2.jpg', new: true },
  { name: 'High-Waisted Joggers', category: 'Pants', size: ['XS', 'S', 'M', 'L', 'XL'], price: 69, rating: 4.6, inStock: true, colors: ['Black', 'Gray', 'Navy'], gender: 'Women', image: '/hero/hero3.jpg', new: false },
  { name: 'Vintage Wash Hoodie', category: 'Hoodies', size: ['M', 'L', 'XL'], price: 95, rating: 4.4, inStock: true, colors: ['Charcoal', 'Sand', 'Navy'], gender: 'Unisex', image: '/hero/hero1.jpg', new: false },
  { name: 'Slim Fit Biker Jeans', category: 'Pants', size: ['28', '30', '32', '34', '36'], price: 89, rating: 4.5, inStock: false, colors: ['Black', 'Blue'], gender: 'Men', image: '/hero/hero2.jpg', new: false },
  { name: 'Longline T-Shirt', category: 'T-Shirts', size: ['S', 'M', 'L', 'XL'], price: 45, rating: 4.2, inStock: true, colors: ['White', 'Black', 'Olive'], gender: 'Men', image: '/hero/hero3.jpg', new: false },
  { name: 'Puffer Vest', category: 'Jackets', size: ['S', 'M', 'L', 'XL'], price: 119, rating: 4.7, inStock: true, colors: ['Black', 'Navy', 'Burgundy'], gender: 'Unisex', image: '/hero/hero1.jpg', new: true },
  { name: 'Ribbed Crop Top', category: 'T-Shirts', size: ['XS', 'S', 'M', 'L'], price: 35, rating: 4.4, inStock: true, colors: ['White', 'Black', 'Pink'], gender: 'Women', image: '/hero/hero2.jpg', new: false },
  { name: 'Classic Bomber Jacket', category: 'Jackets', size: ['M', 'L', 'XL', 'XXL'], price: 179, rating: 4.8, inStock: true, colors: ['Black', 'Olive'], gender: 'Unisex', image: '/hero/hero3.jpg', new: true },
  { name: 'Oversized Sweatpants', category: 'Pants', size: ['S', 'M', 'L', 'XL'], price: 65, rating: 4.6, inStock: true, colors: ['Gray', 'Black', 'Cream'], gender: 'Unisex', image: '/hero/hero1.jpg', new: false },
  { name: 'Zip-Up Hoodie Premium', category: 'Hoodies', size: ['M', 'L', 'XL'], price: 99, rating: 4.7, inStock: true, colors: ['Black', 'Navy', 'Forest'], gender: 'Unisex', image: '/hero/hero2.jpg', new: false },
  { name: 'Vintage Wash Tee', category: 'T-Shirts', size: ['S', 'M', 'L', 'XL'], price: 42, rating: 4.5, inStock: true, colors: ['Black', 'White'], gender: 'Unisex', image: '/hero/hero3.jpg', new: true },
  { name: 'Kids Colour-Block Hoodie', category: 'Hoodies', size: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'], price: 45, rating: 4.8, inStock: true, colors: ['Red', 'Navy', 'Pink'], gender: 'Kids', image: '/hero/hero1.jpg', new: true },
  { name: 'Kids Denim Jacket', category: 'Jackets', size: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'], price: 59, rating: 4.7, inStock: true, colors: ['Blue', 'Black'], gender: 'Kids', image: '/hero/hero2.jpg', new: true },
  { name: 'Kids Jogger Set', category: 'Pants', size: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'], price: 39, rating: 4.6, inStock: true, colors: ['Gray', 'Navy', 'Pink'], gender: 'Kids', image: '/hero/hero3.jpg', new: false },
  { name: 'Kids Graphic Tee', category: 'T-Shirts', size: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'], price: 22, rating: 4.5, inStock: true, colors: ['White', 'Blue', 'Yellow'], gender: 'Kids', image: '/hero/hero1.jpg', new: false },
  { name: 'Kids Fleece Sweatshirt', category: 'Hoodies', size: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'], price: 35, rating: 4.9, inStock: true, colors: ['Cream', 'Pink', 'Blue'], gender: 'Kids', image: '/hero/hero2.jpg', new: true }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
      }
    ]);

    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
