
const mongoose = require('mongoose');


const url = "give your mongodb connection string"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection Successful");
}).catch(err =>{
    console.log("MongoDB connection unsuccessful " + err);
})
