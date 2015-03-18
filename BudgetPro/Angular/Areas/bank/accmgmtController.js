(function () {
    angular.module('app')
        // Path: /
        .controller('accmgmtController', ['$scope', '$state', '$stateParams', 'bankSvcs', function ($scope, $state, $stateParams, bankSvcs) {
            $scope.message = '';
            $scope.newBank = {
                Name :  '',
                Balance :  '',
                ReconciledBalance : '',
            };
            $scope.delBank = '';
            $scope.banks = [];
            $scope.editBank = {
                Id: '',
                Name: '',
                Balance: '',
                ReconciledBalance: '',
            };
            $scope.createBank = function () {
                bankSvcs.createBank($scope.newBank).then(function (response) {
                    console.log(response);
                });
            }
            $scope.deleteBank = function () {
                bankSvcs.deleteBank($scope.delBank).then(function (response) {
                    console.log(response);
                });
            }
            $scope.getBanks = function () {
                bankSvcs.getBanks().then(function (response) {
                    $scope.banks = response;
                });
            }
            $scope.editBank = function () {
                bankSvcs.editBank($scope.editBank).then(function (response) {
                    console.log(response);
                });
            }
        }])
})();