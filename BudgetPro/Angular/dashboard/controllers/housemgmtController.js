angular.module('app')
    // Path: /
    .controller('housemgmtController', ['$scope', '$state', '$stateParams', 'houseSvcs', function ($scope, $state, $stateParams, houseSvcs) {
        $scope.members = [];
        $scope.inviteEmail = '';

        $scope.inviteToHousehold = function () {
            houseSvcs.inviteToHousehold($scope.inviteEmail).then(function (response) {
                console.log(response);
            });
        };
        $scope.leaveHousehold = function () {
            houseSvcs.leaveHousehold().then(function (response) {
                console.log(response);
            });
        };
        $scope.getMembers = function () {
            houseSvcs.getMembers().then(function (response) {
                $scope.members = response;
            })
        }
        $scope.getMembers();
    }]);