const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const productRoute = require('./api/route/productRoute');
const productReviewRoute = require('./api/route/productReviewRoute')
const cartRoute = require('./api/route/cartRoute');
const userRoute = require('./api/route/userRoute');
const locationRoute = require('./api/route/locationRoute');
const discountRoute = require('./api/route/discountRoute');
const db = require('./api/db/connection');
const adminProductRoute = require('./api/route/adminProductRoute')
const helpRoute = require('./api/route/helpRoute')
const ordersRoute = require('./api/route/ordersRoute')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
//app.use(express.static(__dirname + '/shoppingkart/build/'));

app.get('/', function (req, res) {
    res.status(200).send("OK");
});

app.use("/admin",adminProductRoute)

app.use('/product', productRoute);
app.use('/review', productReviewRoute);
app.use('/orders', cartRoute);
app.use('/users', userRoute);
app.use('/location', locationRoute);
app.use('/help', helpRoute);
app.use('/discounts',discountRoute);
app.use('/orders',ordersRoute);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express serve running on port 5000');
});
