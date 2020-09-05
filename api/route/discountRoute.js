/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

const express = require("express");
const discountRoute = express.Router();
const discountController = require("../controller/discountController");


discountRoute.get('/getdiscount/:promocode',discountController.getdiscount);
discountRoute.post('/managediscounts',discountController.postdiscount);
discountRoute.put('/updatediscount/:promocode',discountController.updatediscount);
discountRoute.post('/deletediscount',discountController.deletediscount);
discountRoute.get('/',discountController.getalldiscount);


module.exports = discountRoute;
