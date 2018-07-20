"use strict";
/**
 * Schema for User 
 * 
 * @Author
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
        required: true
    },
    lastName: {
        type: String,
        maxlength: 255
    },
    phoneNumber: {
        type: String,
        maxlength: 255,
        required: true
    },
    emailId: {
        type: String,
        maxlength: 255,
        unique: true,
        required: true,
        validate: [
           // { validator: validator.isEmail, msg: 'invalid email address'},
            { validator: isEmailUnique, msg: 'Email already exists'}
          ]
    },
    addressDetail: {
        addressLine1: { type: String, maxlength: 255 },
        addressLine2: { type: String, maxlength: 255 },
        city: { type: String, maxlength: 255 },
        pincode: { type: Number, maxlength: 255 },
        state: { type: String, maxlength: 255 },
        country: { type: String, maxlength: 255 }
    },
    dateOfBirth: {
        type: Date,
        required: true
    }

});

// function isEmailUnique(value, done) {
//     if (value) {
//         mongoose.models['customer'].count({ _id: { '$ne': this._id }, emailId: value }, function (err, count) {
//             if (err) {
//                 return done(err);
//             }
//             // If `count` is greater than zero, "invalidate"
//             done(!count);
//         });
//     }
// }

var Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;