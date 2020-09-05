/**

 @author    Pallavi Desai => B00837405

 **/
const mongoose = require('mongoose');

const orders = mongoose.Schema({
    username: { type: String, required: true },
    orderItems: { type : Array , "default" : [], required: true },
    grandTotal: { type: Number, required: true },
    orderStatus:{type:String, required: true}
});

module.exports = mongoose.model("orders", orders);