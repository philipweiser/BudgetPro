angular.module('app').factory('bankSvcs', ['$http', function ($http) {
    var factory = {};

    factory.createBank = function (newBank) {
        return $http.post('api/Bank/Create', newBank);
    };
    factory.deleteBank = function (delBank) {
        return $http.post('api/Bank/Delete/', delBank);
    };
    factory.getBanks = function () {
        return $http.get('api/Bank/GetBanks').then(function (response) {
            return response.data;
        });
    };
    factory.updateBank = function (editBank) {
        return $http.post('api/Bank/Edit', editBank);
    };
    return factory;
}]);