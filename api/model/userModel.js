/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const userDataSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
      },
    date: {
        type: Date,
        required: true
      },
    address: {
        type: String,
        required: false 
    }
});
module.exports = user_data = mongoose.model("users",userDataSchema)
