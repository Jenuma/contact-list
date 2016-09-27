var request = require("request");
var app = require("../server");

var base_url = "http://localhost:3000";

describe("The server-side contact controller", function() {
    var controller;
    
    var expectedAllContacts = require("../../config/development-data.json").expectedAllContacts;
    
    it("can get all contacts", function(done) {
        request.get(base_url + "/contacts", function(error, response, body) {
            expect(response.statusCode).toEqual(200);

            body = JSON.parse(body);
            var actualAllContacts = [];
            
            for(var i = 0; i < body.length; i++) {
                var contact = {
                    id: body[i].id,
                    name: body[i].name,
                    email: body[i].email,
                    number: body[i].number
                };
                actualAllContacts.push(contact);
            }
            
            expect(actualAllContacts).toEqual(expectedAllContacts);
            done();
        });
    });
    
    it("can add a new contact", function(done) {
        var formData = {name:"Haley",email:"haley@example.com",number:"(444) 444-4444"};
        var expectedNewContact = require("../../config/development-data.json").expectedNewContact;
        
        var options = {
            url: base_url + "/contacts",
            method: "POST",
            json: true,
            body: formData
        };
        request(options, function(error, response, body) {
            expect(response.statusCode).toEqual(201);
            
            var actualNewContact = {
                id: body.id,
                name: body.name,
                email: body.email,
                number: body.number
            };
            
            expect(actualNewContact).toEqual(expectedNewContact);
            done();
        });
    });
    
    it("can delete a contact", function(done) {
        var id = 2;
        var expectedDeletedContact = require("../../config/development-data.json").expectedAllContacts[id];
        
        request.delete(base_url + "/contacts/" + id, function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            
            body = JSON.parse(body);
            
            var actualDeletedContact = {
                id: body.id,
                name: body.name,
                email: body.email,
                number: body.number
            };
            
            expect(actualDeletedContact).toEqual(expectedDeletedContact);
            done();
        });
    });
});
