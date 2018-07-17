"use strict";
/**
 * Schema for User 
 * 
 * @Author Akanksha Pabaiya
 */
const mongoose = require('../common/database').mongoose;
const Schema = mongoose.Schema;

let customerSchema = new mongoose.Schema({
    createdate: { type: Date, default: Date.now },
    modifieddate: { type: Date, default: Date.now },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'customer'
    },
    modifiedBy: {
        type: Schema.ObjectId,
        ref: 'customer'
    },
    firstName: {
        type: String,
        maxlength: 255,
        required: [true, "The name must be set."]
    },
    lastName: {
        type: String,
        maxlength: 255
    },
    phoneNumber: {
        type: Number,
        maxlength: 255
    },
    
});

var CustomerModel = mongoose.model("customer", customerSchema);

module.exports = CustomerModel;