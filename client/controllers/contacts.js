(function() {
    "use strict";
    
    angular
    .module("contacts", [])
    .controller("ContactController", ContactController);
    
    function ContactController($scope, $http) {
        //
        // View-Model:
        //
        // vm =
        // {
        //     contacts = [Contact1{}, Contact2{}, ...],
        //     formData = Contact{id: w, name: x, email: y, number: z}
        //     isEditing = false/true
        // }
        //

        // Assign the view-model to a variable to be used inside functions.
        var vm = this;

        vm.getContacts = function() {
            $http.get("/contacts")
                .then(function(response) {
                    vm.contacts = response.data;
                });
        };

        vm.addContact = function() {
            $http.post("/contacts", vm.formData)
                .then(function(response) {
                    vm.contacts.push(response.data);

                    vm.formData = undefined;
                });
        };
        
        vm.editContact = function() {
            $http.put("/contacts/" + vm.formData.id, vm.formData)
                .then(function(response) {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.data.id) {
                            vm.contacts[i] = response.data;
                            break;
                        }
                    }
                });
            vm.stopEditing();
        };
        
        vm.updateContact = vm.addContact;
        
        vm.deleteContact = function(id) {
            $http.delete("/contacts/" + id)
                .then(function(response) {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.data.id) {
                            vm.contacts.splice(i, 1);
                            break;
                        }
                    }
                });
        };
        
        vm.startEditing = function(contact) {
            vm.isEditing = true;
            
            // TODO: Find a better deep copy method.
            vm.formData = JSON.parse(JSON.stringify(contact));
            vm.updateContact = vm.editContact;
        };
        
        vm.stopEditing = function() {
            vm.isEditing = false;
            
            vm.formData = undefined;
            vm.updateContact = vm.addContact;
        }
        
        // This call is required to update the view-model when the page loads.
        vm.getContacts();
    }
})();
