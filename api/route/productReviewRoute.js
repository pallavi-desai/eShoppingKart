
const express = require('express');
const productReviewRoute = express.Router();
const productReviewController = require('../controller/productReviewController');

productReviewRoute.post('/putReview', productReviewController.postProductreview);

productReviewRoute.get('/getProductReview/:query', productReviewController.getProductReview);

module.exports = productReviewRoute;