// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String,require:true  },
  price: { type: Number, required: true },
  imageUrl: { type: String,require:true  },
  category: { type: String },
  quantity: { type: Number,require:true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
