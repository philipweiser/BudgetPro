angular.module('app').factory('userSvcs', ['$http', function ($http) {
    var factory = {};

    factory.setPassword = function (OldPassword, NewPassword, ConfirmPassword) {
        var options = { OldPassword: OldPassword, NewPassword: NewPassword, ConfirmPassword: ConfirmPassword }
        return $http.post('/api/Account/ChangePassword', options)
            .then(function (response) { return response.data });
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