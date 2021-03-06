const mongoose = require('mongoose');
const Customer = require('../models/customer');
nodeMailer = require('nodemailer'),
 Nexmo = require('nexmo');


/**
 * Create User API
 **/
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }
    let customer = new Customer(req.body);
    customer.dateOfBirth = new Date(customer.dateOfBirth).toDateString();
    customer.save()
        .then(data => {
            return res.json({
                code: 1,
                message: "User Saved Successfully ",
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
exports.getCustomer = (req, res) => {
    Customer.find()
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
                    message: "Customer return successfully",
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
exports.getCustomerById = (req, res) => {
    Customer.findById(req.params.id)
        .then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "Customer not exist in the database",
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Customer return successfully",
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
exports.updateCustomer = (req, res) => {
    let customer = req.body || {},
        opts = {
            new: true
        }
    Customer.findByIdAndUpdate({ _id: req.params.id }, customer, opts)
        .then(data => {
            if(data==null){
                return res.json({
                    code: 0,
                    message: "Customer not exist in the database",
                    status: false
                });
            }else{
                return res.json({
                    code: 1,
                    message: "Customer updated successfully",
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
exports.deleteCustomer = (req, res) => {
    Customer.findOneAndRemove({ _id: req.params.id })
        .then(data => {
            if (data == null) {
                return res.json({
                    code: 0,
                    message: "Customer not exist in the database",
                    status: false
                });
            } else {
                return res.json({
                    code: 1,
                    message: "Customer deleted successfully",
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
 * Send Mail API
 * **/
// exports.sendMail = (req, res) => {
//     let nexmo = new Nexmo();
//     Nexmo.message.sendSms(
//         '8319811569', '8085653740', 'hello', {type: 'unicode'},
//         (err, responseData) => {if (responseData) {
//             console.log(responseData)
//         }}
//       );
//     // let transporter = nodeMailer.createTransport({
//     //     host: 'smtp.gmail.com',
//     //     port: 465,
//     //     secure: true,
//     //     auth: {
//     //         user: 'xxx@xx.com',
//     //         pass: 'xxxx'
//     //     }
//     // });
//     // let mailOptions = {
//     //     from: '"triveni yadaw" <triveni123yadav@gmail.com>', // sender address
//     //     to: 'triveni.yadaw@newvisionsoftware.in', // list of receivers
//     //     subject: 'test', // Subject line
//     //     text: 'heelo', // plain text body
//     //     html: '<b>NodeJS Email Tutorial</b>' // html body
//     // };

//     // transporter.sendMail(mailOptions, (error, info) => {
//     //     if (error) {
//     //         return console.log(error);
//     //     }
//     //     console.log('Message %s sent: %s', info.messageId, info.response);
//     //     res.render('index');
//     // });
// }