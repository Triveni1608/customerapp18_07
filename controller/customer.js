const mongoose = require('mongoose');
let Customer = require('../models/customer');

module.exports.addUser = function (req, res,next) {
    if (!req.body) {
        console.log(req.body)
       // logger.error("body not Found");
        return res.json({
            code: 0,
            message: "Body not found.",
        });
    }

    let customerModel = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.createdBy
    });
    customerModel.save(function (err, data) {
        if (err) {
           // logger.error("Error in Saving User. : " + err);
            return res.json({
                code: 0,
                message: "Error in Saving User. : " + err,
                error: err
            });
        } else {
           // logger.info("User Saved Successfully ");
            return res.json({
                code: 1,
                message: "User Saved Successfully ",
                data: data
            });
        }
    });
}