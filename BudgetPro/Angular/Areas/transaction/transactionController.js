angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', 'categorySvcs', 'bankSvcs', function ($scope, $state, $stateParams, transactionSvcs, categorySvcs, bankSvcs) {
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
            ReconciledTF:false,
        };
        $scope.AccountName = [];
        $scope.CategoryName = '';
        $scope.categories = [];
        $scope.transactions = [];
        bankSvcs.getBanks().then(function (response) { $scope.accounts = response; });
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Transaction">' +
                '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="btn" value="Edit" /></div>',
            enableSorting: false
            },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Transaction">' +
                        '<input type="button"  ng-click="grid.appScope.deleteTransaction(row.entity.Id)" class="btn" value="Delete" /></div>',
                enableSorting: false
            },
            { name: 'Description' },
            { name: 'Category', field: 'CategoryName' },
            { name: 'Amount' },
            { name: 'ReconciledAmount' },
            { name: 'Date', cellFilter: 'date' },
        ];
        $scope.whichEdit= function(entity){
            $scope.transaction = entity;
            $scope.transaction.Amount == $scope.transaction.ReconciledAmount ? $scope.transaction.ReconciledTF = true : $scope.transaction.ReconciledTF = false;
        }
        $scope.gridOptions = {
            data: 'transactions',
            columnDefs: $scope.columns,
        };
        $scope.getTransactions = function () {
            $scope.transactions = [];
            $scope.gridOptions.data = [];
            $scope.categories = [];
            return transactionSvcs.getTransactions($scope.transaction.AccountId)
                .then(function (response) {
                    $scope.transactions = response;
                    for (i = 0; i < response.length; i++) {
                        if ($scope.categories.indexOf(response[i].CategoryName) < 0)
                            $scope.categories.push(response[i].CategoryName);
                    }
                });
        };
        $scope.createTransaction = function () {
            if ($scope.transaction.ReconciledTF)
                $scope.transaction.ReconciledAmount = $scope.transaction.Amount;

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
            transactionSvcs.updateTransaction($scope.transaction)
                .then(function (response) {
                    $scope.getTransactions();
                    $scope.resetFields();
                });
        };
        $scope.accountSelected = function () {
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