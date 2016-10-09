/**
 * Contact Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
    .module("wg.contacts", [])
    .controller("ContactController", ContactController);
    
    ContactController.$inject = ["$http", "errorService"];
    
    /**
     * Client (Angular) Controller for a Contact resource.
     * @constructor ContactController
     * @memberOf ClientControllers
     * @param {service} $http - Facilitates communication with remote HTTP server.
     * @param {service} errorService - Notified if there are any errors with contacts.
     */
    function ContactController($http, errorService) {
        /**
         * The view-model for a Contact resource.
         * @typedef {View-Model}
         * @memberOf ClientControllers.ContactController
         * @instance
         * @property {Contact[]} contacts - An array of all contacts.
         * @property {Contact} formData - Data currently in the form.
         * @property {boolean} isEditing - Indicates if the user is editing.
         * @property {string} updateIcon - Icon for the add/edit button.
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;

        /**
         * Gets all the contacts and updates the view-model.
         * @function getContacts
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.getContacts = function() {
            $http.get("/contacts")
                .then(function(response) {
                    vm.contacts = response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };

        /**
         * Adds a contact to the list and updates the view-model.
         * @function addContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.addContact = function() {
            $http.post("/contacts", vm.formData)
                .then(function(response) {
                    vm.contacts.push(response.data);
                    
                    vm.formData = undefined;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };
        
        /**
         * Edits the selected contact and updates the view-model.
         * @function editContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.editContact = function() {
            $http.put("/contacts/" + vm.formData.id, vm.formData)
                .then(function(response) {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.data.id) {
                            vm.contacts[i] = response.data;
                            break;
                        }
                    }
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
            vm.stopEditing();
        };
        
        /**
         * Either redirects to addContact or editContact depending on the value
         * of isEditing.
         * @function updateContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.updateContact = vm.addContact;
        
        /**
         * Removes a contact from the list and updates the view-model.
         * @function deleteContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.deleteContact = function(id) {
            $http.delete("/contacts/" + id)
                .then(function(response) {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.data.id) {
                            vm.contacts.splice(i, 1);
                            break;
                        }
                    }
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };
        
        /**
         * Prepares the controller to enter edit mode and updates the view-model.
         * @function startEditing
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.startEditing = function(contact) {
            vm.isEditing = true;
            
            vm.updateIcon = "fa fa-check fa-fw";
            
            // TODO: Find a better deep copy method.
            vm.formData = JSON.parse(JSON.stringify(contact));
            vm.updateContact = vm.editContact;
        };
        
        /**
         * Exits edit mode and updates the view-model.
         * @function stopEditing
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.stopEditing = function() {
            vm.isEditing = false;
            
            vm.updateIcon = "fa fa-plus fa-fw";
            
            vm.formData = undefined;
            vm.updateContact = vm.addContact;
        }
        
        vm.getContacts();
    }
})();
