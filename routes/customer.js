"use strict";
const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer');
router.post('/customer',customerController.create);
module.exports = router;