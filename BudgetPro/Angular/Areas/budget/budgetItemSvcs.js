﻿angular.module('app').factory('budgetItemSvcs', ['$http', function ($http) {
    var factory = {};

    factory.createBudgetItem = function (foo) {
        return $http.post('api/Budget/Create', foo)
            .then(function (response) {
                return response.data;
            });
    };
    factory.deleteBudgetItem = function (id) {
        return $http.post('api/Budget/Delete', id)
            .then(function (response) {
                return response.data;
            });
    };
    factory.getBudget = function () {
        return $http.get('api/Budget/GetBudget')
            .then(function (response) {
                return response;
            });
    };
    factory.updateBudgetItem = function (foo) {
        return $http.post('api/Budget/Update', foo)
            .then(function (response) {
                return response.data;
            });
    };
    return factory;
}]);