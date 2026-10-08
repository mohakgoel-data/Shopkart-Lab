import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';

dotenv.config();

const seedProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Experience premium sound with our top-of-the-line wireless headphones, featuring active noise cancellation and 30 hours of battery life.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    stock: 25,
  },
  {
    name: 'Minimalist Ceramic Vase',
    description: 'A beautiful, handcrafted ceramic vase perfect for modern home decor. Adds a touch of elegance to any room.',
    price: 45.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80',
    stock: 12,
  },
  {
    name: 'Classic Leather Messenger Bag',
    description: 'Durable and stylish leather messenger bag with multiple compartments for laptops, books, and everyday essentials.',
    price: 120.50,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    stock: 8,
  },
  {
    name: 'The Art of Computer Programming',
    description: 'The classic foundational textbook on computer science and algorithms by Donald Knuth.',
    price: 155.00,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    stock: 5,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.dbURL);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(seedProducts);
    console.log('Successfully seeded database with products');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
