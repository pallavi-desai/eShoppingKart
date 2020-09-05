/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

//load the model
const Discount = require("../model/discountModel");

//get all discount data
const getalldiscount = (req,res ) => {
    Discount.find().exec()
    .then(data => {
        res.json({ Status :"Success", data : data});
    })
    .catch(err => {
        console.log("Failure:" + err);
    })
}

//get request for specific promo code
const getdiscount = (req, res) => {
    Discount.find({ promocode: req.params.promocode }).exec()
        .then(data => {
            res.json({ Status: "Success", data: data });
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

//post request to add discount % and promocode
const postdiscount = async (req, res) => {
    const newPromocode = new Discount({
        promocode: req.body.promocode,
        discount: req.body.discountpercent
    });
    try {
        const existingPromocode = await Discount.find({ promocode: req.body.promocode })
        if (existingPromocode.length > 0) {
            res.json({ "Success": false })
        }
        else {
            const savedItem = await newPromocode.save().then(console.log("Promocode with discount % is saved to the database"))
            res.json({ "Success": true })
        }

    } catch (err) {
        res.json({ message: err })
    }
}

//update discount percent for the existing promocode
const updatediscount = (req, res) => {
    Discount.find({ promocode: req.params.promocode }).exec()
        .then(disc => {
            if (disc.length === 0) {
                res.json({ Status: "Failed", message: "The user does not exist in the database" });
            } else {
                Discount.updateOne({ promocode: req.params.promocode }, { $set: { discount: req.body.discountpercent } }).exec()
                    .then(data => {
                        res.json({ Status: "Success", message: "Discount modified" });
                    })
                    .catch(err => {
                        console.log("Failure in modifying the data:" + err);
                    })
            }
        })
        .catch(err => {
            console.log("Error in fetching the data:" + err);
        })
}

//delete discount stored in the db
const deletediscount = async (req, res) => {
    try {
        const removedItem = await Discount.deleteOne({ promocode: req.body.promocode })
        if (removedItem.n === 1) {
            res.json({ "Success": true })
        }
        else {
            res.json({ "Success": false })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.getdiscount = getdiscount;
module.exports.postdiscount = postdiscount;
module.exports.updatediscount = updatediscount;
module.exports.deletediscount = deletediscount;
module.exports.getalldiscount = getalldiscount;