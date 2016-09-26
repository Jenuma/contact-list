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
        
        expectedAllContacts = readJSON("development-data.json").allContacts;
        
        $httpBackend.expectGET("/contacts").respond(200, expectedAllContacts);
        contactsController = $controller("ContactController", {"$scope": $rootScope});
        $httpBackend.flush();
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it("can get all contacts", function() {
        $httpBackend.whenGET("/contacts").respond(200, expectedAllContacts);
        contactsController.getContacts();
        $httpBackend.flush();
        
        expect(contactsController.contacts).toEqual(expectedAllContacts);
    });
    
    it("can add a new contact and update the list", function() {
        // Set up the new contact:
        var newContact = readJSON("development-data.json").newContact;
        contactsController.newContact = JSON.parse(JSON.stringify(newContact));
        
        $httpBackend.whenPOST("/contacts").respond(200, newContact);
        contactsController.addContact();
        $httpBackend.flush();
        
        // New contact should be added:
        expectedAllContacts.push(newContact);
        
        expect(contactsController.contacts).toEqual(expectedAllContacts);
    });
});