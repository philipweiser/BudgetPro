angular.module('app').factory('userSvcs', ['$http', function ($http) {
    var factory = {};

    factory.setPassword = function (entity) {
        var options = { OldPassword: entity.OldPassword, NewPassword: entity.NewPassword, ConfirmPassword: entity.ConfirmPassword }
        return $http.post('/api/Account/ChangePassword', options)
            .then(function (response) { return response});
    };
    factory.getUser = function () {
        return $http.post('/api/Account/SelectUser', Number(0))
            .then(function (response) { return response.data });
    };
    factory.updateUser = function (user) {
        return $http.post('/api/Account/UpdateUser', user);
    };
    return factory;
}]);