angular.module('app')
    // Path: /
    .controller('topbarController', ['$scope', '$state', '$stateParams', 'authService', '$location', function ($scope, $state, $stateParams, authService, $location) {

        $scope.logout = authService.logout;
        $scope.authentication = authService.authentication;
        $scope.goLogin = function () {
            $location.path("/login");
        }
    }])