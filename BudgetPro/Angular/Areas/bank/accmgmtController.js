(function () {
    angular.module('app')
        // Path: /
        .controller('accmgmtController', ['$scope', '$state', '$stateParams', 'bankSvcs', '$location', function ($scope, $state, $stateParams, bankSvcs, $location) {
            $scope.getBanks = function () {
                bankSvcs.getBanks().then(function (response) {
                    if (response.data != null) {
                        $scope.banks = response.data
                    }
                    else { $location.path("/Household"); }
                    ;
                });
            }
            $scope.getBanks();
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
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Account">' +
                            '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="form-control btn btn-primary" value="Edit" /></div>',
                        enableSorting: false,
                        enableFiltering: false,
                        enableColumnMenu: false
                    },
                    {
                        name: ' ',
                        width: '80', field: 'Id',
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Account">' +
                               '<input type="button"  ng-click="grid.appScope.deleteBank(row.entity.Id)" class="form-control btn btn-danger" value="Delete" /></div>',
                        enableSorting: false,
                        enableFiltering: false,
                        enableColumnMenu: false
                    },
                    { name: 'Name' },
                    { name: 'Balance', cellFilter: 'currency' },
                    { name: 'ReconciledBalance', cellFilter: 'currency' }
                ]
            };
            $scope.createBank = function () {
                bankSvcs.createBank($scope.newBankName).then(function (response) {
                    $scope.getBanks();
                    $scope.newBankName = '';
                });
            }
            $scope.deleteBank = function (id) {
                bankSvcs.deleteBank(id).then(function (response) {
                    $scope.getBanks();
                });
            }

            $scope.editBankSubmit = function () {
                bankSvcs.updateBank($scope.editBank).then(function (response) {
                    $scope.getBanks();
                    $scope.editBank.Name = '';
                });
            }
            $scope.whichEdit = function (entity) {
                $scope.editBank = entity;
            }

        }])
})();