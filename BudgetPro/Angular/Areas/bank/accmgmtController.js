(function () {
    angular.module('app')
        // Path: /
        .controller('accmgmtController', ['$scope', '$state', '$stateParams', 'bankSvcs', function ($scope, $state, $stateParams, bankSvcs) {
            $scope.message = '';
            $scope.newBankName= '';
            $scope.delBank = '';
            $scope.banks = [];
            $scope.editBank = {
                Id: '',
                Name: '',
                Balance: '',
                ReconciledBalance: '',
            };
            $scope.gridOptions = {
                enableFiltering: true,
                data: 'banks',
                columnDefs: [
                    { name: ' ', width: '80', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Account"><i class="icon-pencil" />Edit</div>' },
                    { name: 'Name' },
                    { name: 'Balance' },
                    { name: 'ReconciledBalance' }
                ]
            };
            $scope.createBank = function () {
                bankSvcs.createBank($scope.newBankName).then(function (response) {
                });
            }
            $scope.deleteBank = function () {
                bankSvcs.deleteBank($scope.delBank).then(function (response) {
                });
            }
            $scope.getBanks = function () {
                bankSvcs.getBanks().then(function (response) {
                    $scope.banks = response;
                });
            }
            $scope.editBankSubmit = function () {
                bankSvcs.updateBank($scope.editBank).then(function (response) {
                });
            }
        }])
})();