/**

 @author    Pallavi Desai => B00837405

 **/

const orders = require("../model/orders");
const users = require("../model/userModel");

// function to add order details in collection
const addToCart = (req, res) => {
  const order = new orders({
  username: req.body.username,
  orderItems: req.body.orderItems,
  grandTotal: req.body.grandTotal,
  orderStatus: req.body.orderStatus
  });

 order.save()
    .then((data) => {
      res.json({ Status: "Success", message: "Order confirmed" });
    })
    .catch((err) => {
      res.json({ Status: "Failure", message: err });
      console.log("Failure in adding the data:" + err);
    });
};

/* function to get the order details
username = logged in user
order status = confirmed (for orders which is confirmed) / unconfirmed (items added to the cart)
*/
const getOrderDetails = (req, res) => {
    orders.find({ username: req.params.username, orderStatus: req.params.orderStatus}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
};


// to change the delivery address of the user
const changeAddress = (req, res) => {
    users.updateOne({ username: req.params.username }, { $set: { address: req.body.address}}).exec()
    .then(data => {
        res.json({Status:"Success", message: "User modified" });
    })
    .catch(err => {
        console.log("Failure in modifying the data:" + err);
    })
}

// to get the user details
const getUserDetails = (req, res) =>{
    users.find({ username: req.params.username }).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

// to remove the order whose status is unconfirmed
const removeOrderData = (req, res) =>{
    orders.findOneAndDelete({ username: req.params.username, orderStatus: req.params.orderStatus}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

module.exports.addToCart = addToCart;
module.exports.getOrderDetails = getOrderDetails;
module.exports.changeAddress = changeAddress;
module.exports.getUserDetails = getUserDetails;
module.exports.removeOrderData = removeOrderData;