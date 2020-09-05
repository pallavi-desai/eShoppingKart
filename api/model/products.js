/**

 @author    Hardik Dudhrejia => B00835071

 **/

const mongoose = require('mongoose');

const products = mongoose.Schema({
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productBrand: {type: String, required: true},
    productQuantity: {type: Number, required: true},
    productURL: {type: String, required: true},
    productDescription: {type: String, required: false},
    // productDetails: {type: Object, required: false}
});

module.exports = mongoose.model("products", products,"products");
