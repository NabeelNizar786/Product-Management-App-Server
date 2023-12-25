// In your server/controllers/productController.js
const { uploadTocloudinary } = require('../config/cloudinary');
const productModel = require('../model/productModel');
const categoryModel = require('../model/categoryModel');
const subcategoryModel = require('../model/subCategoryModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(products);
    res.status(200).json({products:products})
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const addProduct = async (req, res) => {
  try {
      const images = req.files.map(file => file.path);
      console.log(images);

      const {
          title,
          ram,
          price,
          category,
          subcategory,
          totalProducts,
          description,
      } = req.body;

      const uploadedImages = [];

      for (const imagePath of images) {
        const data = await uploadTocloudinary(imagePath, 'images')
        uploadedImages.push({url:data.url, public_id: data.public_id})
      }

      const newProduct = new productModel({
          title: title,
          ram: ram,
          price: price,
          category:category,
          subcategory:subcategory,
          totalProducts: totalProducts,
          description: description,
          images: uploadedImages.map(image => image.url),
          imagesId: uploadedImages.map(image => image.public_id)
      });

      console.log(newProduct);

      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error' });
  }
};

const addCategory = async (req, res) => {
  try {
    const { categoryname } = req.body; // Destructure categoryname from req.body

    console.log(categoryname);

    const newCategory = new categoryModel({
      categoryname: categoryname,
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category Added Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

const categories = async (req,res) => {
  try {
    const categories = await categoryModel.find({}).populate('subcategories');
    console.log(categories);
    res.status(200).json({categories:categories})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
}


const addSubCategory = async (req, res) => {
  try {
    const { subcategoryname, category } = req.body;

    // Assuming you have the ObjectId of an existing category
    const existingCategory = await categoryModel.findById(category);

    if (!existingCategory) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const newSubCategory = new subcategoryModel({
      subcategoryname: subcategoryname,
      category: existingCategory._id, // Associate with the existing category
    });

    await newSubCategory.save();

    // Update the category to include the new subcategory reference
    existingCategory.subcategories.push(newSubCategory._id);
    await existingCategory.save();

    res.status(201).json({ message: 'SubCategory Added Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

const subCategories = async(req, res) => {
  try {
    const subcategories = await subcategoryModel.find({})
    console.log(subcategories);

    res.status(200).json({subcategories:subcategories})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
}

const getProductDetails = async(req, res) => {
  try {
   const id = req.params.id;

   let productData = await productModel.findOne({_id:id})

   console.log(productData);

   if(productData) {

    res.status(201).json({message:'productFound', product:productData})
   } else {

    res.status(404).json({message: 'product not found'})
   }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
}


module.exports = {
  getAllProducts,
  addProduct,
  addCategory,
  categories,
  addSubCategory,
  subCategories,
  getProductDetails
};
