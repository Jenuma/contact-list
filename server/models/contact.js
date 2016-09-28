var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
    name: String, default: "",
    email: String, default: "",
    number: String, default: ""
});

ContactSchema.plugin(autoIncrement.plugin, {model: "Contact", field: "id"});

exports.Contact = mongoose.model("Contact", ContactSchema, "contacts");
