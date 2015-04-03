angular.module('app')
    // Path: /
    .controller('accmgmtController', ['$scope', '$state', '$stateParams', 'bankSvcs', '$location', '$modal', function ($scope, $state, $stateParams, bankSvcs, $location, $modal) {
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
                        '<input type="button"  ng-click="grid.appScope.editModal(row.entity)" class="form-control btn btn-primary" value="Edit" /></div>',
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
        $scope.newModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/bank/createModal.html',
                size: 'sm',
                controller: 'newBankModalController',
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.newBankName = response;
                    $scope.createBank();
                }
            }
        )
        };
        $scope.editModal = function (entity) {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/bank/editModal.html',
                size: 'sm',
                controller: 'editBankModalController',
                resolve: {
                    entity: function () {
                        return entity;
                    }
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.editBank = response;
                    $scope.editBankSubmit();
                }
            }
        )
        };
    }]);
angular.module('app').controller('newBankModalController', function ($scope, $modalInstance) {
    $scope.ok = function () {
        if ($scope.Name != undefined)
            $modalInstance.close($scope.Name);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
angular.module('app').controller('editBankModalController', function ($scope, $modalInstance, entity) {
    $scope.entity = entity;
    $scope.ok = function () {
        if ($scope.entity != undefined)
            $modalInstance.close($scope.entity);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});