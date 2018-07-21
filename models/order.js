"use strict";
/**
 * Schema for User 
 * 
 * @Author
 */
const mongoose = require('../common/database').mongoose;
const Schema = mongoose.Schema;

let orderSchema = new mongoose.Schema({
    createdate: { type: Date, default: Date.now },
    modifieddate: { type: Date, default: Date.now },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'order'
    },
    modifiedBy: {
        type: Schema.ObjectId,
        ref: 'order'
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        references: {
            model: "customer",
            key: "_id"
        }
    },
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    quantity: {
        type: Number,
        maxlength: 255,
        required: true
    },
    type: {
        category: { type: String, maxlength: 255 ,required: true},
        subcategory: { type: String, maxlength: 255 ,required: true }
    }
    
});



var Order = mongoose.model("order", orderSchema);

module.exports = Order;