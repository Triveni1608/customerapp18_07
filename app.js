const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const db = require('./common/database');
const CustomerController = require('./controller/customer');

/**
 * Routing
 */
var customerRoute = require('./routes/customer'); 
app.use(customerRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const server = app.listen(3000,function(){
    console.log("application is started at 3000 port");
})
