/**
 @author    Bharat Bhargava => B00838511
 **/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// to create Schema to Product review model
const productReviewSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productRating: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('productReview', productReviewSchema);