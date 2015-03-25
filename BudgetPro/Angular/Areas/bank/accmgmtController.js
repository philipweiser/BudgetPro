(function () {
    angular.module('app')
        // Path: /
        .controller('accmgmtController', ['$scope', '$state', '$stateParams', 'bankSvcs', function ($scope, $state, $stateParams, bankSvcs) {
            $scope.message = '';
            $scope.newBankName = '';
            $scope.delBank = '';
            $scope.banks = [];
            $scope.editBank = {
                Id: '',
                Name: '',
                Balance: '',
                ReconciledBalance: '',
            };
            $scope.gridOptions = {
                data: 'banks',
                columnDefs: [
                    {
                        name: '',
                        width: '80', field: 'Id',
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Account">'+
                            '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="btn" value="Edit" /></div>',
                        enableSorting: false
                    },
                    {
                        name: ' ',
                        width: '80', field: 'Id',
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Account">' +
                               '<input type="button"  ng-click="grid.appScope.deleteBank(row.entity.Id)" class="btn" value="Delete" /></div>',
                        enableSorting: false
                    },
                    { name: 'Name' },
                    { name: 'Balance' },
                    { name: 'ReconciledBalance' }
                ]
            };
            $scope.createBank = function () {
                bankSvcs.createBank($scope.newBankName).then(function (response) {
                    $scope.getBanks();
                });
            }
            $scope.deleteBank = function (id) {
                bankSvcs.deleteBank(id).then(function (response) {
                    $scope.getBanks();
                });
            }
            $scope.getBanks = function () {
                bankSvcs.getBanks().then(function (response) {
                    $scope.banks = response;
                });
            }
            $scope.editBankSubmit = function () {
                bankSvcs.updateBank($scope.editBank).then(function (response) {
                    $scope.getBanks();
                });
            }
            $scope.whichEdit = function (entity) {
                $scope.editBank = entity;
            }
            $scope.getBanks();
        }])
})();