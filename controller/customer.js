const mongoose = require('mongoose');
const Customer = require('../models/customer');

// module.exports.addUser = function (req, res,next) {
//     if (!req.body) {
//         console.log(req.body)
//        // logger.error("body not Found");
//         return res.json({
//             code: 0,
//             message: "Body not found.",
//         });
//     }

//     let customerModel = new Customer({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phoneNumber: req.body.phoneNumber,
//         createdBy: req.body.createdBy,
//         modifiedBy: req.body.createdBy
//     });
//     Customer.addUser(function (err, customerModel) {
//         if (err) {
//            // logger.error("Error in Saving User. : " + err);
//             return res.json({
//                 code: 0,
//                 message: "Error in Saving User. : " + err,
//                 error: err
//             });
//         } else {
//            // logger.info("User Saved Successfully ");
//             return res.json({
//                 code: 1,
//                 message: "User Saved Successfully ",
//                 data: data
//             });
//         }
//     });
// }


exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    var myData = new Customer(req.body);

    // Save Note in the database
    myData.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};