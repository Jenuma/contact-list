//
// Main entry point for the program; this file serves all files to the browser
//
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var dbConfig = require("../config/db");
var routes = require("./routes");

var app = express();

//
// Static directories
//
app.use("/angular", express.static("../node_modules/angular"));
app.use("/jquery", express.static("../node_modules/jquery/dist"));
app.use("/bootstrap", express.static("../node_modules/bootstrap/dist"));
app.use("/controllers", express.static("../client/controllers"));
app.use(express.static("../client/views"));
app.use(bodyParser.json());

//
// Mongoose connection logic
//
mongoose.connect(dbConfig.url);
var connection = mongoose.connection;

connection.on("error", console.error.bind(console, "Connection error: "));

connection.once("open", function() {
   console.log("Connected to db.contact-list-dev.contacts."); 
});

// Override Mongoose's deprecated Promise framework
mongoose.Promise = global.Promise;

app.use("/", routes);

app.listen(3000);
console.log("Server running on port 3000...");

module.exports = app;
