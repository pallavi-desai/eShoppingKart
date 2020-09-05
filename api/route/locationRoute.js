const express = require('express');
const locationRoute = express.Router();
const locationController = require('../controller/locationController');

locationRoute.get('/getTopProductsByLocation/:city', locationController.getTopProductsByLocation);
locationRoute.get('/getProductDetailsByLocation/:city/:query', locationController.getProductDetailsByLocation);
locationRoute.get('/getSearchedProductsByLocation/:city/:query', locationController.getSearchedProductsByLocation);
locationRoute.get('/getSuggestionsByLocation/:city/:query', locationController.getSuggestionsByLocation);

module.exports = locationRoute;