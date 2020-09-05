/**

 @author    Deep Muni => B00828375

 **/

const mongoose = require('mongoose');

// Schema for products

const products = mongoose.Schema({
    productID: { type: Number, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productBrand: {type: String, required: true},
    productQuantity: {type: Number, required: true},
    imageURL: {type: String, required: true},
    productDescription: {type: String, required: true},
});

// Exporting the schema

module.exports = mongoose.model("products", products,"products");
