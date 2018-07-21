const mongoose = require('mongoose');
const Order = require('../models/order');



/**
 * Create User API
 **/
exports.createOrder = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Order can not be empty"
        });
    }
    let order = new Order(req.body);
    order.save()
        .then(data => {
            return res.json({
                code: 1,
                message: "Order Saved Successfully ",
                data: data,
                status: true
            });
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};

/**
 * Get User API
 **/
exports.getOrder = (req, res) => {
    Order.find()
        .then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "No record found",
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Order return successfully",
                    data: data,
                    status: true
                });
            }
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};


/**
 * Get User  By Id API
 **/
exports.getOrderById = (req, res) => {
    Order.findById(req.params.id)
        .then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "Order not exist in the database",
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Order return successfully",
                    data: data,
                    status: true
                });
            }
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};

/**
 * Update User  API
 **/
exports.updateOrder = (req, res) => {
    let order = req.body || {},
        opts = {
            new: true
        }
        Order.findByIdAndUpdate({ _id: req.params.id }, order, opts)
        .then(data => {
            if(data==null){
                return res.json({
                    code: 0,
                    message: "Order not exist in the database",
                    status: false
                });
            }else{
                return res.json({
                    code: 1,
                    message: "Order updated successfully",
                    data: data,
                    status: true
                });
            }
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};


/**
 * delete  User  API
 **/
exports.deleteOrder = (req, res) => {
    Order.findOneAndRemove({ _id: req.params.id })
        .then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "Order not exist in the database",
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Order deleted successfully",
                    status: true
                });
            }
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};


/**
 * get customre order detaols API
 **/
exports.getCustomerOrderDetails = (req, res) => {
    Order.aggregate([
        {
          $lookup:
            {
              from: "customers",
              localField: "customerId",
              foreignField: "_id",
              as: "customerInfo"
            }
       }
     ]).then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "Customer Orders not exist in the database",
                    data: data,
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Customer Orders Details return successfully",
                    data: data,
                    status: true
                });
            }
        }).catch(err => {
            return res.json({
                code: err.code,
                message: err.message,
                error: err,
                status: false
            });
        });
};




