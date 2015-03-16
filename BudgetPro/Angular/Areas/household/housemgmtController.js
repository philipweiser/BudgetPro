angular.module('app')
    // Path: /
    .controller('housemgmtController', ['$scope', '$state', '$stateParams', 'houseSvcs', function ($scope, $state, $stateParams, houseSvcs) {
        $scope.inviteEmail = '';
        $scope.houseName = '';
        $scope.theHouse = '';
        $scope.houseData = [];

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
                $scope.houseData = response;
            })
        };
        $scope.createHousehold = function () {
            houseSvcs.createHousehold($scope.houseName).then(function (response) {
                $scope.theHouse = response;
            })
        };
    }]);