const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    totalProducts: { type: Number, required: true },
    category: { type: String, required:true },
    subcategory: { type: String, required:true },
    description: { type: String, required: true },
    images: [{ type: String }],
    imagesId: [{ type: String }],
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;