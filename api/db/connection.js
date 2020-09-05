/**

 @author    Deep Muni => B00828375

 **/

const mongoose = require('mongoose');


const url = "mongodb+srv://webUser:admin123@cluster0.jb5qq.mongodb.net/CSCI_5709_Project?retryWrites=true&w=majority"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection Successful");
}).catch(err =>{
    console.log("MongoDB connection unsuccessful " + err);
})
