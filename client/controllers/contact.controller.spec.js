describe("The client-side contact controller", function() {
    // module() is provided by angular-mocks.js
    beforeEach(module("app"));
    
    var $controller, $httpBackend, $rootScope;
    var contactController, expectedAllContacts;
    
    // $controller is the service responsible for instantiating controllers.
    // It is not available on the global scope, so we must inject it this way.
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get("$httpBackend");
        $rootScope = $injector.get("$rootScope");
        $controller = $injector.get("$controller");
        
        expectedAllContacts = readJSON("development-data.json").expectedAllContacts;
        
        $httpBackend.expectGET("/contacts")
            .respond(200, expectedAllContacts);
        
        contactController = $controller("ContactController", {"$scope": $rootScope});
        $httpBackend.flush();
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it("can get all contacts", function() {
        $httpBackend.whenGET("/contacts")
            .respond(200, expectedAllContacts);
        
        contactController.getContacts();
        $httpBackend.flush();
        
        expect(contactController.contacts).toEqual(expectedAllContacts);
    });
    
    it("can add a new contact", function() {
        var newContact = readJSON("development-data.json").newContact;
        //TODO: Find a better deep copy method.
        contactController.formData = JSON.parse(JSON.stringify(newContact));
        
        var expectedNewContact = readJSON("development-data.json").expectedNewContact;
        
        $httpBackend.whenPOST("/contacts")
            .respond(200, expectedNewContact);
        
        contactController.addContact();
        $httpBackend.flush();
        
        expectedAllContacts.push(expectedNewContact);
        
        expect(contactController.contacts).toEqual(expectedAllContacts);
    });
    
    it("can delete a contact", function() {
        var id = 2;
        var contactToDelete = contactController.contacts[id];
        
        $httpBackend.whenDELETE("/contacts/" + contactToDelete.id)
            .respond(200, contactToDelete);
        contactController.deleteContact(contactToDelete.id);
        $httpBackend.flush();
        
        for(var i = 0; i < expectedAllContacts.length; i++) {
            if(expectedAllContacts[i].id === id) {
                expectedAllContacts.splice(i, 1);
                break;
            }
        }
        
        expect(contactController.contacts).toEqual(expectedAllContacts);
    });
    
    it("can edit a contact", function() {
        contactController.formData = contactController.contacts[0];
        var expectedEditedContact = readJSON("development-data.json").expectedEditedContact;
        
        $httpBackend.whenPUT("/contacts/" + contactController.formData.id)
            .respond(200, expectedEditedContact);
        contactController.editContact();
        $httpBackend.flush();
        
        expectedAllContacts[0] = expectedEditedContact;
        
        expect(contactController.contacts).toEqual(expectedAllContacts);
    });
});
