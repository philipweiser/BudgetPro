angular.module('app').factory('transactionSvcs', ['$http', function ($http) {
    var factory = {};

    factory.createTransaction = function (foo) {
        return $http.post('api/Transaction/Create', foo)
            .then(function (response) {
                return response.data;
            });
    };
    factory.deleteTransaction = function (id) {
        return $http.post('api/Transaction/Delete', id)
            .then(function (response) {
                return response.data;
            });
    };
    factory.getTransactions = function () {
        return $http.get('api/Transaction/GetTransactions')
            .then(function (response) {
                return response.data;
            });
    };
    factory.updateTransaction = function (foo) {
        return $http.post('api/Transaction/Update', foo)
            .then(function (response) {
                return response.data;
            });
    };
    return factory;
}]);