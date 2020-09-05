/**

 @author    Deep Muni => B00828375

 **/

const express = require('express');
const helpRoute = express.Router();

// Requiring the controller file
const helpController = require('../controller/helpController');

/**
 @Route author    Deep Muni => B00828375
 **/
// Route to get all the products
helpRoute.get('/getAll', helpController.getAllQuestions);

// Route to get product name for suggestion
helpRoute.get('/getSuggestion/:query', helpController.getQuestionSuggestion);

// Route to get product list for result page
helpRoute.get('/getAnswer/:query', helpController.getAnswer);

// Exporting the routes
module.exports = helpRoute;
