"use strict";
let environment = process.env.env || "D";
//let logger = require('../common/logger');
let config = null;


if (environment === "D") {
   // logger.info("Development config resolved.");
    config = require("./dev_config.json");
} else if (environment === "P") {
   // logger.info("Production config resolved.");
    config = require("./prod_config.json");
} else if(environment === "Q") {
   // logger.info("Testing config resolved.");
    config = require("./testing.json");
}else if(environment === "test") {
   // logger.info("Test Case config resolved.");
    config = require("./testCase_config.json");
}

module.exports = config;