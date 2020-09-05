/**
 @author Vikash Salvi B00838074
 **/


const express = require('express')
const ordersModel = require("../model/orders");

const productsModel = require("../model/productModel")

const getOrders =  (req,res) => {
    ordersModel.find({ "username": req.body.username }).exec()
        .then(async ordersData => {
            let data = ordersData
            let productId;
            for (let i in data[0].orderItems) {
                productId = data[0].orderItems[i].id
                const pro = await productsModel.find({"productID": productId})
                data[0].orderItems[i].description = pro[0].productDescription
            }
            res.json({ Status: "Success", data: data });
        })
        .catch(err => {
            console.log("Failure:" + err);
    })
}

module.exports.getOrders = getOrders
