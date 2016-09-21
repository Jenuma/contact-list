//
// /contacts
//
var router = require("express").Router();

router.get("/", function(req, res) {
    var Contact = require("../models/contact").Contact;
    
    Contact.find({}).lean().exec()
        .then(function(results) {
            res.status(200).json(results);
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
});

router.post("/", function(req, res) {
    var Contact = require("../models/contact").Contact;
    
    var newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    });
    
    newContact.save()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
});

module.exports = router;
