/**
 @author    Bharat Bhargava => B00838511
 **/

//  Load the model
const productReviewModel = require("../model/productReviewModel");

// Post request for adding product review
const postProductreview = (req, res) => {
    let userid = req.body.user_id;
    let productid = req.body.product_id;
    let productrating = req.body.product_rating;
    let productdesc = req.body.product_description;
    let username = req.body.user_name
    console.log(productrating);

    productReviewModel.create({
        userId: userid,
        productId: productid,
        productRating: productrating,
        productDescription: productdesc,
        userName: username
    }).then(data => {
        res.json({ Status: "Success", data: data });
    })
        .catch(err => {
            console.log("Failure:" + err);
        });
}

/**
 @function author    Vikash Salvi => B00838074
 **/
//Get all the reviews of a particular product
const getProductReview = (req, res) => {
    productReviewModel.find({ "productId": req.params.query }).exec()
        .then(data => {
            res.json({ Status: "Success", data: data });
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

module.exports.postProductreview = postProductreview;
module.exports.getProductReview = getProductReview;
