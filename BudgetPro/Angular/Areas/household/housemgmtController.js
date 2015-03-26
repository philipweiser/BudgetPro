angular.module('app')
    // Path: /
    .controller('housemgmtController', ['$scope', '$state', '$stateParams', 'houseSvcs', '$modal', function ($scope, $state, $stateParams, houseSvcs, modal) {
        $scope.inviteEmail = '';
        $scope.houseName = '';
        $scope.theHouse = '';
        $scope.houseData = '';
        $scope.message = '';
        $scope.gridOptions = {
            data: 'houseData',
            columnDefs: [
                { name: 'Name' },
                { name: 'Email' }
            ]
        };
        $scope.gridHide = true;
        $scope.joinHide = true;
        $scope.inviteToHousehold = function () {
            if ($scope.inviteEmail == null || $scope.inviteEmail == "") {
                return $scope.message = "Not a valid email";
            }
            houseSvcs.inviteToHousehold($scope.inviteEmail).then(function (response) {
                $scope.inviteEmail = '';
                return $scope.message = "Your invite was sent successfully.";
            });
        };
        $scope.leaveHousehold = function () {
            houseSvcs.leaveHousehold().then(function (response) {
                $scope.getMembers();
            });
        };
        $scope.getMembers = function () {
            houseSvcs.getMembers().then(function (response) {
                if (response.data.length != 0) {
                    $scope.gridHide = false;
                    $scope.houseData = response.data;
                } else {
                    $scope.gridHide = true;
                };
            });
        };
        $scope.createHousehold = function () {
            houseSvcs.createHousehold($scope.houseName).then(function (response) {
                if (response == -2) {
                    $scope.message = "Leave your current Household before creating a new one."
                } else {
                    $scope.message = "Your Household has been successfully created.";
                }
                $scope.getMembers();
            });
        };
        $scope.joinHousehold = function () {
            houseSvcs.joinHousehold().then(function (response) {

                $scope.getMembers();
            })
        }
        $scope.getMembers();
        $scope.canJoin = function () {
            houseSvcs.canJoin().then(function (response) {
                if (response.data == null) {
                    $scope.joinHide = true;
                } else {
                    $scope.joinHide = false;
                }
            })
        }
        $scope.canJoin();
    }]);