/**
 @author Vikash Salvi B00838074
 **/
const express = require('express')
const orderRoute = express.Router()
const userOrdersController = require('../controller/ordersController')

orderRoute.post("/getOrders",userOrdersController.getOrders)

module.exports = orderRoute;
