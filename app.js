const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const db = require('./common/database');
const CustomerController = require('./controller/customer');
var customerRoute = require('./routes/customer'); 
var orderRoute = require('./routes/order'); 
var argv = require('minimist')(process.argv.slice(2));
var subpath = express();
var swagger = require('swagger-node-express').createNew(subpath);
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./dist/api-docs.json');

/**
 * Routing
 */


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 
// parse application/json
app.use(bodyParser.json())



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', subpath);

 app.use(customerRoute);
 app.use(orderRoute);
app.get('/', function(req, res){
    console.log("fds")
})


const server = app.listen(3000,function(){
    console.log("application is started at 3000 port");
})
