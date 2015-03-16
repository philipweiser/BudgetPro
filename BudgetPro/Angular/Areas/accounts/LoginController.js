(function () {
    angular.module('app').controller('loginController', ['$scope', '$location', '$state', 'authService', function ($scope, $location, $state, authService) {

        $scope.loginData = {
            Email: "",
            Password: ""
        };

        $scope.message = "";
        $scope.isError = false;

        $scope.login = function () {

            authService.login($scope.loginData).then(function (response) {

                $state.go('dashboard');

            },
             function (err) {
                 $scope.message = err.error_description;
                 $scope.isError = true;
             });
        };

    }]);
})();