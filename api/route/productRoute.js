/**

 @author    Deep Muni => B00828375

 **/

const express = require('express');
const productRoute = express.Router();

// Requiring the controller file
const productController = require('../controller/productController');

/**
 @Route author    Deep Muni => B00828375
 **/
// Route to get all the products
productRoute.get('/getAll', productController.getAllProducts);

// Route to get product name for suggestion
productRoute.get('/getSuggestion/:query', productController.getSuggestions);

// Route to get product list for result page
productRoute.get('/getSearchedProduct/:query', productController.getSearchedProducts);

/**
 @Route author Vikash Salvi => B00838074
 **/
//Route to get product detail based on product id
productRoute.get('/getProductDetails/:query', productController.getProductDetails);
//Route to get all products featured on main page
productRoute.get('/getTopProducts', productController.getTopProducts);

/**
 @Route author Bharat Bhargava => B00838511
 **/
//Route to set product detail based on product id
productRoute.post('/setProductDetails', productController.postProductDetails);

// Exporting the routes
module.exports = productRoute;


