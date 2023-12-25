const express = require('express');
const { userRegister, userLogin, isUserAuth } = require('../controller/userController');
const router = express.Router();
const {userAuthentication} = require('../middlewares/userAuth');
const { getAllProducts, addProduct, addCategory, categories, addSubCategory, subCategories, getProductDetails } = require('../controller/productController');
const upload = require('../middlewares/multer');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/userAuth', userAuthentication, isUserAuth);
router.get('/products', getAllProducts);
router.post('/addProduct', upload.array('images',3),addProduct);
router.post('/addCategory', addCategory);
router.get('/categories', categories);
router.post('/addSubCategory', addSubCategory);
router.get('/subcategories',subCategories);
router.get('/productDetails/:id',getProductDetails);

module.exports = router;