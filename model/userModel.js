const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to import Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Product" 
  }],
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Category" 
  }],
  subcategories: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Subcategory" 
  }],
  cart: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Product" 
  }],
  wishlist: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Product" 
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;