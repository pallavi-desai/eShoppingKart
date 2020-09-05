/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/userController");

userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.get('/getuser/:username',userController.getuser);
userRoute.put('/editprofile/:username',userController.editprofile);

module.exports = userRoute;
