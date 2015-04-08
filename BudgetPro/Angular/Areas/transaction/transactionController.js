angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', 'categorySvcs', 'bankSvcs', '$location', '$modal', function ($scope, $state, $stateParams, transactionSvcs, categorySvcs, bankSvcs, $location, $modal) {
        $scope.transaction = {
            Id: '',
            AccountId: '',
            Amount: '',
            ReconciledAmount: '',
            Date: '',
            Description: '',
            CategoryId: '',
            AccountName: '',
            CategoryName: '',
            ReconciledTF: false,
            Debit: false,
        };
        $scope.AccountName = [];
        $scope.CategoryName = '';
        $scope.transactions = [];
        $scope.categories = [];
        bankSvcs.getBanks().then(function (response) {
            if (response.data != null) {
                $scope.accounts = response.data;
            } else {
                $location.path("/Household");
            }
        });
        $scope.newModal = function () {
            $scope.resetFields();
            $scope.transaction.Debit = true;
            $scope.transaction.CategoryName = $scope.CategoryName;
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/transaction/createModal.html',
                size: 'sm',
                controller: 'newTransactionModalController',
                resolve: {
                    entity: function () {
                        return $scope.transaction;
                    },
                    categories: function () {
                        return $scope.categories;
                    },
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.transaction = response;
                    $scope.createTransaction();
                }
            }
        )
        };
        $scope.editModal = function (entity) {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/transaction/editModal.html',
                size: 'sm',
                controller: 'editTransactionModalController',
                resolve: {
                    entity: function () {
                        return entity;
                    },
                    categories: function () {
                        return $scope.categories;
                    }
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.transaction = response;
                    $scope.updateTransaction();
                }
            }
        )
        };
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Transaction">' +
                '<input type="button"  ng-click="grid.appScope.editModal(row.entity)" value="Edit" class="btn btn-primary"/></div>',
            enableSorting: false,
            enableFiltering: false,
            enableColumnMenu: false,
        },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Transaction">' +
                        '<input type="button"  ng-click="grid.appScope.deleteTransaction(row.entity.Id)" class="form-control btn btn-danger" value="Delete" /></div>',
                enableSorting: false,
                enableFiltering: false,
                enableColumnMenu: false
            },
            { name: 'Description' },
            { name: 'Category', field: 'CategoryName' },
            { name: 'Amount', cellFilter: 'currency' },
            { name: 'ReconciledAmount', cellFilter: 'currency' },
            { name: 'Date', cellFilter: 'date' },
        ];
        $scope.hideNew = true;
        $scope.gridOptions = {
            data: 'transactions',
            columnDefs: $scope.columns,
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls: true,
        };
        $scope.getCategories = function () {
            return categorySvcs.getCategories()
                .then(function (response) {
                    if (response != null) {
                        $scope.categories = response;
                    } else {
                        $location.path("/Household");
                    }
                })
        }
        $scope.getTransactions = function () {
            $scope.transactions = [];
            $scope.gridOptions.data = [];
            $scope.getCategories();
            return transactionSvcs.getTransactions($scope.transaction.AccountId)
                .then(function (response) {
                    $scope.transactions = response;
                });
        };
        $scope.createTransaction = function () {
            if ($scope.transaction.ReconciledTF)
                $scope.transaction.ReconciledAmount = $scope.transaction.Amount;
            if ($scope.transaction.Debit) {
                $scope.transaction.Amount = -Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = -Math.abs($scope.transaction.ReconciledAmount);
            } else {
                $scope.transaction.Amount = Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = Math.abs($scope.transaction.ReconciledAmount);
            }
            transactionSvcs.createTransaction($scope.transaction)
                .then(function (response) {
                    $scope.getTransactions();
                });
        };
        $scope.deleteTransaction = function (id) {
            transactionSvcs.deleteTransaction(id)
                .then(function (response) {
                    $scope.getTransactions();
                });
        };
        $scope.updateTransaction = function () {
            if ($scope.transaction.ReconciledTF)
                $scope.transaction.ReconciledAmount = $scope.transaction.Amount;
            else
                $scope.transaction.ReconciledAmount = 0;
            if ($scope.transaction.Debit) {
                $scope.transaction.Amount = -Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = -Math.abs($scope.transaction.ReconciledAmount);
            } else {
                $scope.transaction.Amount = Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = Math.abs($scope.transaction.ReconciledAmount);
            }
            transactionSvcs.updateTransaction($scope.transaction)
                .then(function (response) {
                    $scope.getTransactions();
                });
        };
        $scope.resetFields = function () {
            $scope.transaction.Amount = '';
            $scope.transaction.Description = '';
            $scope.CategoryName = '';
            $scope.transaction.CategoryName = '';
            $scope.transaction.CategoryId = '';
            $scope.transaction.ReconciledTF = '';
        }
        $scope.accountSelected = function () {
            $scope.transaction.AccountId = $scope.AccountName.Id;
            $scope.transaction.AccountName = $scope.AccountName.Name;
            $scope.hideNew = false;
            $scope.getTransactions();
        }

        
    }])
angular.module('app').controller('newTransactionModalController', function ($scope, $modalInstance, entity, categories) {
    $scope.entity = entity;
    $scope.categories = categories;
    $scope.formCompleted = false;

    $scope.ok = function () {
        if ($scope.entity.Description != '' &&
            $scope.entity.Amount != '' &&
            $scope.entity.CategoryId != '')
            $scope.formCompleted = true;
        if ($scope.formCompleted)
            $modalInstance.close($scope.entity);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
angular.module('app').controller('editTransactionModalController', function ($scope, $modalInstance, entity, categories) {
    $scope.entity = entity;
    $scope.categories = categories;
    $scope.ok = function () {
        if ($scope.entity != undefined)
            $modalInstance.close($scope.entity);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
