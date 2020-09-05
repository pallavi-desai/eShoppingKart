/**

 @author    Deep Muni => B00828375

 **/

const helpModel = require("../model/helpModel");

/**
 @function author    Deep Muni => B00828375
 **/

// This controller will help to fetch all the questions
const getAllQuestions = (req, res) => {
    helpModel.find().exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

/**
 @function author    Deep Muni => B00828375
 **/

// This controller will help to fetch the suggestion
const getQuestionSuggestion = (req, res) => {
    helpModel.find({"question" : {$regex : ".*"+ req.params.query +".*", $options: "i"}}).exec()
        .then(data => {
            let finalData = [];
            data.map(d => {
                finalData.push({id: d.id, question: d.question});
            });
            res.json({ Status :"Success", data : finalData});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

/**
 @function author    Deep Muni => B00828375
 **/

// This controller will help to fetch the answer
const getAnswer = (req, res) => {
    helpModel.find({"id" : req.params.query}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data[0].answer});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

// Exporting the controller

module.exports.getAllQuestions = getAllQuestions;
module.exports.getQuestionSuggestion = getQuestionSuggestion;
module.exports.getAnswer = getAnswer;
