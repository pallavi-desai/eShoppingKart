/**

 @author    Hardik Dudhrejia => B00835071

 **/
const express = require('express')
const adminRoute = express.Router()
const adminProductController = require('../controller/adminProductController')

adminRoute.post("/saveProduct",adminProductController.saveProduct)
adminRoute.post("/deleteProduct",adminProductController.deleteProduct)
adminRoute.post("/editProduct",adminProductController.updateProduct)
adminRoute.get("/getAllUsers",adminProductController.getAllUsers)
adminRoute.get("/deleteUser",adminProductController.deleteUser)

module.exports = adminRoute;
