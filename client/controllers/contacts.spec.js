describe("The client-side ContactController", function() {
    // module() is provided by angular-mocks.js
    beforeEach(module("app"));
    
    var $controller, $httpBackend, $rootScope;
    var contactsController, expectedAllContacts;
    
    // $controller is the service responsible for instantiating controllers.
    // It is not available on the global scope, so we must inject it this way.
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get("$httpBackend");
        $rootScope = $injector.get("$rootScope");
        $controller = $injector.get("$controller");
        
        expectedAllContacts = readJSON("development-data.json").expectedAllContacts;
        
        $httpBackend.expectGET("/contacts")
            .respond(200, expectedAllContacts);
        
        contactsController = $controller("ContactController", {"$scope": $rootScope});
        $httpBackend.flush();
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    //
    // getContacts()
    //
    it("can get all contacts", function() {
        $httpBackend.whenGET("/contacts")
            .respond(200, expectedAllContacts);
        
        contactsController.getContacts();
        $httpBackend.flush();
        
        expect(contactsController.contacts).toEqual(expectedAllContacts);
    });
    
    //
    // addContact()
    //
    it("can add a new contact", function() {
        // Set up the new contact:
        var newContact = readJSON("development-data.json").newContact;
        contactsController.newContact = JSON.parse(JSON.stringify(newContact));
        
        var expectedNewContact = {
            id: contactsController.contacts.length + 1,
            name: newContact.name,
            email: newContact.email,
            number: newContact.number
        }
        
        $httpBackend.whenPOST("/contacts")
            .respond(200, expectedNewContact);
        
        contactsController.addContact();
        $httpBackend.flush();
        
        // New contact should be added:
        expectedAllContacts.push(expectedNewContact);
        
        expect(contactsController.contacts).toEqual(expectedAllContacts);
    });
    
    //
    // deleteContact()
    //
    it("can delete a contact", function() {
        var id = 2;
        var contactToDelete = contactsController.contacts[id];
        
        $httpBackend.whenDELETE("/contacts/" + contactToDelete.id)
            .respond(200, contactToDelete);
        contactsController.deleteContact(contactToDelete.id);
        $httpBackend.flush();
        
        // Deleted contact should be gone:
        for(var i = 0; i < expectedAllContacts.length; i++) {
            if(expectedAllContacts[i].id === id) {
                expectedAllContacts.splice(i, 1);
                break;
            }
        }
        
        expect(contactsController.contacts).toEqual(expectedAllContacts);
    });
});
