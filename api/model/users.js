const mongoose = require('mongoose');

const users = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address : { type: String, required: true }
});

module.exports = mongoose.model("users", users);
