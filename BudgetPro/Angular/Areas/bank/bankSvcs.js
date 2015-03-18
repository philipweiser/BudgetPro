angular.module('app').factory('bankSvcs', ['$http', function ($http) {
    var factory = {};

    factory.createBank = function (newBank) {
        var options = {
            Name : newBank.Name,
            Balance: newBank.Balance,
            ReconciledBalance : newBank.ReconciledBalance
        };
        return $http.post('api/Bank/Create', options);
    };
    factory.deleteBank = function (delBank) {
        var options = {
            id : delBank
        };
        return $http.post('api/Bank/Delete', options);
    };
    factory.getBanks = function () {
        return $http.get('api/Bank/GetBanks', options).then(function (response) {
            return response.data;
        });
    };
    factory.updateBanks = function (editBank) {
        var options = {

        };
        return $http.post('api/Bank/Edit', options);
    };
    return factory;
}]);