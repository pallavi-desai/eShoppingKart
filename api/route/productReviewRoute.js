/**
 @author    Bharat Bhargava => B00838511
 **/

const express = require('express');
const productReviewRoute = express.Router();
const productReviewController = require('../controller/productReviewController');

productReviewRoute.post('/putReview', productReviewController.postProductreview);

/**
 @Route author Vikash Salvi => B00838074
 **/
productReviewRoute.get('/getProductReview/:query', productReviewController.getProductReview);

module.exports = productReviewRoute;