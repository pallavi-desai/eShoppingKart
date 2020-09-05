const productModel = require("../model/productModel");

const getTopProductsByLocation = (req,res) => {
    productModel.find({city: req.params.city}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

const getProductDetailsByLocation = (req,res) => {
    productModel.find({city:req.params.city, "productID" : parseInt(req.params.query)}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

const getSearchedProductsByLocation = (req, res) => {
    productModel.find({city:req.params.city, "productName" : {$regex : ".*"+ req.params.query +".*", $options: "i"}}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

const getSuggestionsByLocation = (req, res) => {
    productModel.find({city:req.params.city, "productName": { $regex: ".*" + req.params.query + ".*", $options: "i" } }).exec()
        .then(data => {
            let finalData = new Set();
            data.map(d => {
                finalData.add(d.productName);
            });
            res.json({ Status: "Success", data: Array.from(finalData) });
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}


module.exports.getTopProductsByLocation = getTopProductsByLocation;
module.exports.getProductDetailsByLocation = getProductDetailsByLocation;
module.exports.getSearchedProductsByLocation = getSearchedProductsByLocation;
module.exports.getSuggestionsByLocation = getSuggestionsByLocation;