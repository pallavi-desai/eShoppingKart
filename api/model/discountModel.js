/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

const mongoose = require("mongoose");
const Schema = mongoose.Schema
const discountSchema = new Schema({
    promocode: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },

});
module.exports = discount_data = mongoose.model("discount",discountSchema)