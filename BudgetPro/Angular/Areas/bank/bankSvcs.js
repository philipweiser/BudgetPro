(function () {
    angular.module('app').factory('bankSvcs', ['$http', function ($http) {
        var factory = {};

        factory.createBank = function (newBank) {
            var options = {

            };
            $http.post('api/Bank/Create', options);
        };
        factory.deleteBank = function (delBank) {
            var options = {

            };
            $http.post('api/Bank/Delete', options);
        };
        factory.getBanks = function () {
            $http.get('api/Bank/GetBanks', options);
        };
        factory.updateBanks = function (editBank) {
            var options = {

            };
            $http.post('api/Bank/Edit', options);
        };
        return factory;
    }]);
});