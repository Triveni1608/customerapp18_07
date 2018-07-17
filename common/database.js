"use strict";
/**
 * Methods for Connecting Database
 * 
 * @Author Akanksha Pabaiya
 */

//const databaseConfig = require('../config/index');
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise; 
let databaseConfig = {
	mongoUrl : "mongodb://localhost/testDB"
}

//connect mongodb database
mongoose.connect(databaseConfig.mongoUrl,{ useMongoClient: true }); 

// Handle connected event
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to : '+databaseConfig.mongoUrl);
});

// Handle error event
mongoose.connection.on('error', function(err){
	console.error('Mongoose connection error : '+err);
});

// Handle disconnected event
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected.');
});

// Handle application termination event
process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoosej disconnected through application termination.');
		process.exit(0);
	});
});

exports.mongoose = mongoose;