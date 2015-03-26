angular.module('app').factory('houseSvcs', ['$http', function ($http) {
    var factory = {};

    factory.deleteHouse = function () {
        return $http.get('/api/Household/Delete')
            .then(function(response){return response.data});
    };
    factory.createHousehold = function (name) {
        return $http.post('/api/Household/Create', '"' + name + '"')
            .then(function (response) {return response.data });
    };
    factory.getMembers = function () {
        return $http.get('/api/Household/GetMembers')
            .then(function (response) { return response });
    };
    factory.joinHousehold = function () {
        return $http.get('/api/Household/Join')
            .then(function (response) { return response });
    };
    factory.leaveHousehold = function () {
        return $http.post('/api/Household/Leave')
            .then(function (response) { return response.data });
    };
    factory.inviteToHousehold = function (email) {
        return $http.post('/api/Household/Invite', '"' + email + '"')
            .then(function (response) {return response.data });
    };
    factory.canJoin = function () {
        return $http.get('/api/Household/CanJoin')
            .then(function (response) { return response });
    };
    return factory;
}]);