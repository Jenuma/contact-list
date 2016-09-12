var express = require("express");
var mongoose = require("mongoose");
var app = express();

app.use("/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/public"));

app.get("/contacts", function(req, res)
{   
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/mean-tut-dev");
    
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function()
    {
       console.log("Connected to db.mean-tut-dev.contacts."); 
    });
    
    var contactSchema = mongoose.Schema
    (
        {
            name: String,
            email: String,
            number: String
        }
    );
    
    var Contact = mongoose.model("Contact", contactSchema, "contacts");
    
    var contacts = Contact.find({}).lean().exec(function(err, contact)
    {
        if(err)
        {
            console.log(err);    
        }
        
        res.json(contact);
    });
});

app.listen(3000);
console.log("Server running on port 3000...");
