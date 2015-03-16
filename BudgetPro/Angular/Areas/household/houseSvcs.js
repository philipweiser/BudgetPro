angular.module('app').factory('houseSvcs', ['$http', function ($http) {
    var factory = {};

    factory.deleteHouse = function () {

    };
    factory.createHousehold = function (name) {
        return $http.post('/api/Household/Create', '"' + name + '"')
            .then(function (response) { console.log(response); return response.data });
    };
    factory.getMembers = function () {
        return $http.get('/api/Household/GetMembers')
            .then(function (response) { return response.data });
    };
    factory.updateHouse = function () {

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