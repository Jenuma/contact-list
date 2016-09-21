var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
    name: String, default: "",
    email: String, default: "",
    number: String, default: ""
});

exports.Contact = mongoose.model("Contact", ContactSchema, "contacts");
