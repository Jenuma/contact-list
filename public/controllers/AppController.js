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
    
    $scope.addContact = function()
    {
        $http.post("/contacts", $scope.contact).then
        (
            (
                function(response)
                {
                    vm.contacts.push(response.data);
                    
                    $scope.contact.name = "";
                    $scope.contact.email = "";
                    $scope.contact.number = "";
                    
                    return vm;
                }
            )
        );
    };
});
