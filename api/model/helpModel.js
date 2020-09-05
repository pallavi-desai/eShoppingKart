/**

 @author    Deep Muni => B00828375

 **/

const mongoose = require('mongoose');

// Schema for help

const help = mongoose.Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

// Exporting the schema

module.exports = mongoose.model("help", help,"help");
