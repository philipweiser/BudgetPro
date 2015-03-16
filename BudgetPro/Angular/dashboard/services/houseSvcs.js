angular.module('app').factory('houseSvcs', ['$http', function ($http) {
    var factory = {};

    factory.deleteHouse = function () {

    };
    factory.getMembers = function () {
        return $http.get('/api/Household/GetMembers')
            .then(function (response) { return response.data });
    };
    factory.updateHouse = function () {

    };
    factory.mergeHouse = function () {

    };
    factory.leaveHousehold = function () {
        return $http.get('/api/Household/Leave')
            .then(function (response) { return response.data });
    };
    factory.inviteToHousehold = function (email) {
        return $http.post('/api/Household/Invite', '"' + email + '"')
            .then(function (response) { return response.data });
    };
    return factory;
}]);