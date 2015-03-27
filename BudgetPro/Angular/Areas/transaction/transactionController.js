angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', 'categorySvcs', 'bankSvcs', '$location', function ($scope, $state, $stateParams, transactionSvcs, categorySvcs, bankSvcs, $location) {
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
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Transaction">' +
                '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="form-control btn btn-primary" value="Edit" /></div>',
            enableSorting: false,
            enableFiltering: false,
            enableColumnMenu: false
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
        $scope.debitCredit = function(){
            $scope.transaction.Amount = - $scope.transaction.Amount;
            $scope.transaction.ReconciledAmount = - $scope.transaction.ReconciledAmount;
        }
        $scope.whichEdit = function (entity) {
            $scope.transaction = entity;
            $scope.transaction.Amount == $scope.transaction.ReconciledAmount ? $scope.transaction.ReconciledTF = true : $scope.transaction.ReconciledTF = false;
            $scope.CategoryName = entity.CategoryName;
            $scope.transaction.Amount > 0 ? $scope.transaction.Debit = false : $scope.transaction.Debit = true;
        }
        $scope.gridOptions = {
            data: 'transactions',
            columnDefs: $scope.columns,
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls: true,
        };
        $scope.getTransactions = function () {
            $scope.transactions = [];
            $scope.gridOptions.data = [];
            $scope.getCategories();
            return transactionSvcs.getTransactions($scope.transaction.AccountId)
                .then(function (response) {
                    $scope.transactions = response;
                });
        };
        $scope.getCategories = function () {
            return categorySvcs.getCategories()
                .then(function (response) {
                    if (response != null) {
                    $scope.categories = response.data;
                    } else {
                        $location.path("/Household");
                    }
                })
        }
        $scope.createTransaction = function () {
            if ($scope.transaction.ReconciledTF)
                $scope.transaction.ReconciledAmount = $scope.transaction.Amount;
            $scope.transaction.CategoryName = $scope.CategoryName;
            if ($scope.transaction.Debit) {
                $scope.transaction.Amount = -Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = -Math.abs($scope.transaction.ReconciledAmount);
            } else {
                $scope.transaction.Amount = Math.abs($scope.transaction.Amount);
                $scope.transaction.ReconciledAmount = Math.abs($scope.transaction.ReconciledAmount);
            }
            transactionSvcs.createTransaction($scope.transaction)
                .then(function (response) {
                    $scope.resetFields();
                    $scope.getTransactions();
                });
        };
        $scope.deleteTransaction = function (id) {
            transactionSvcs.deleteTransaction(id)
                .then(function (response) {
                    $scope.getTransactions();
                    $scope.resetFields();
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
                    $scope.resetFields();
                });
        };
        $scope.accountSelected = function () {
            $scope.resetFields();
            $scope.transaction.AccountId = $scope.AccountName.Id;
            $scope.transaction.AccountName = $scope.AccountName.Name;
            $scope.getTransactions();
        }
        $scope.resetFields = function () {
            $scope.transaction.Amount = '';
            $scope.transaction.Description = '';
            $scope.CategoryName = '';
            $scope.transaction.CategoryName = '';
        }
    }])