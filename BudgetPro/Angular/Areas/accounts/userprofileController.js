angular.module('app')
    // Path: /
    .controller('userprofileController', ['$scope', '$state', '$stateParams', 'userSvcs', function ($scope, $state, $stateParams, userSvcs) {
        $scope.user = {
            Id : '',
            Name : '',
            Email: '',
            PhoneNumber: '',
            Household: '',
            UserName: ''
        };
        userSvcs.getUserByEmail().then(function (response) {
            $scope.user = response;
        });

        $scope.updateUser= function () {
            userSvcs.updateUser($scope.user);
        }
    }]);