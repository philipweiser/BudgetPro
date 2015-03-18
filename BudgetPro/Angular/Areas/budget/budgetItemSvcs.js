angular.module('app').factory('budgetItemSvcs', ['$http', function ($http) {
    var factory = {};

    factory.createBudgetItem = function (foo) {
        $http.post('api/Budget/Create', foo)
            .then(function (response) {
                console.log(response);
            });
    };
    factory.deleteBudgetItem = function (id) {
        $http.post('api/Budget/Delete', new { id: id })
            .then(function (response) {
                console.log(response);
            });
    };
    factory.getBudget = function () {
        var options = { HouseholdId: Number(0) };
        $http.post('api/Budget/GetBudget', options)
            .then(function (response) {
                console.log(response);
            });
    };
    factory.updateBudgetItem = function () {
        $http.post('api/Budget/Update')
            .then(function (response) {
                console.log(response);
            });
    };
    return factory;
}]);