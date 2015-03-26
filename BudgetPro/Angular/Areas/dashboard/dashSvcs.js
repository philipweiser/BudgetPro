﻿angular.module('app').factory('dashSvcs', ['$http', function ($http) {
    var factory = {};
    factory.getDash = function () {
        return $http.get('/api/Dashboard/GetDashboard')
            .then(function (response) {return response.data });
    };
    return factory;
}]);