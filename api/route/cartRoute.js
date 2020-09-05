/**

 @author    Pallavi Desai => B00837405

 **/

const express = require('express');
const cartRoute = express.Router();
const cartController = require('../controller/cartController');

cartRoute.post('/addToCart', cartController.addToCart);
cartRoute.get('/getOrderDetails/:username/:orderStatus', cartController.getOrderDetails);
cartRoute.put('/changeAddress/:username', cartController.changeAddress);
cartRoute.get('/getUserDetails/:username', cartController.getUserDetails);
cartRoute.delete('/removeOrderData/:username/:orderStatus', cartController.removeOrderData);

module.exports = cartRoute;