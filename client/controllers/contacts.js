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
        //     newContact = Contact{id: w, name: x, email: y, number: z}
        // }
        //

        // Assign the view-model to a variable to be used inside functions.
        var vm = this;

        vm.getContacts = function() {
            $http.get("/contacts").then(
                function(response) {
                    vm.contacts = response.data;
                    return vm;
                }
            );
        };

        vm.addContact = function() {
            $http.post("/contacts", vm.newContact).then(
                function(response) {
                    vm.contacts.push(response.data);

                    vm.newContact.name = "";
                    vm.newContact.email = "";
                    vm.newContact.number = "";

                    return vm;
                }
            );
        };
        
        vm.deleteContact = function(id) {
            $http.delete("/contacts/" + id).then(
                function(response) {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.data.id) {
                            vm.contacts.splice(i, 1);
                            break;
                        }
                    }
                    return vm;
                }
            );
        };

        // This call is required to update the view-model when the page loads.
        vm.getContacts();
    }
})();
