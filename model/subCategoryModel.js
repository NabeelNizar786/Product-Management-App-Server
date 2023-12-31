const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    subcategoryname: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  });
  
  const Subcategory = mongoose.model('Subcategory', subcategorySchema);
  module.exports = Subcategory;
  