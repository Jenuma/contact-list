var contactListApp = angular.module("contactListApp", []);

contactListApp.controller("ContactTableController", function($scope, $http)
{
    var vm = this;
    
    $http.get("/contacts").then
    (
        function(response)
        {
            vm.contacts = response.data;
            return vm;
        }
    );
});
