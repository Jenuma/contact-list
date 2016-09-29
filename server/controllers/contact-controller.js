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
            res.status(500).json(err);
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
            res.status(201).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(500).json(err);
        });
});

router.delete("/:id", function(req, res) {
    var id = req.params.id;
    
    var Contact = require("../models/contact").Contact;
    Contact.findOneAndRemove({id: id}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).json(err);
        });
});

router.put("/:id", function(req, res) {
    var id = req.params.id;
    
    var Contact = require("../models/contact").Contact;
    Contact.findOneAndUpdate({id: id}, req.body, {new: true}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).json(err);
        });
});

module.exports = router;
