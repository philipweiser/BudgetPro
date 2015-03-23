angular.module('app')
    // Path: /
    .controller('userprofileController', ['$scope', '$state', '$stateParams', 'userSvcs', function ($scope, $state, $stateParams, userSvcs) {
        $scope.user = {
            Id : '',
            Name : '',
            Email: '',
            Household: '',
            UserName: ''
        };
        $scope.getUser = function () {
            userSvcs.getUser().then(function (response) {
                $scope.user = response;
            });
        }

        $scope.updateUser= function () {
            userSvcs.updateUser($scope.user);
        }
        $scope.getUser();
    }]);