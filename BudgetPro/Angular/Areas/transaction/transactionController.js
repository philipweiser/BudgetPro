angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', 'categorySvcs', 'bankSvcs', function ($scope, $state, $stateParams, transactionSvcs, categorySvcs, bankSvcs) {
        $scope.transaction = {
            Id: '',
            AccountName: '',
            Amount: 0,
            ReconciledAmount: 0,
            Date: '',
            Description: '',
            CategoryId: '',
        };
        $scope.accounts = bankSvcs.getBanks();
        $scope.columns = [
                { name: 'AccountName' },
                { name: 'Amount' },
                { name: 'ReconciledAmount' },
                { name: 'Date' },
                { name: 'Description' },
                { name: 'Date' },
                { name: 'Category', field: 'Name'}
        ];
        $scope.gridOptions = {
            data: 'transactions',
            columnDefs: $scope.columns
        };
        $scope.getTransactions = function () {
            return transactionSvcs.getTransactions()
                .then(function (response) {
                    $scope.transactions = response;
                });
        };
        $scope.createTransaction = function () {
            transactionSvcs.createTransaction($scope.transaction, $scope.Name)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.deleteTransaction = function () {
            transactionSvcs.deleteTransaction($scope.transaction.Id)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.updateTransaction = function () {
            transactionSvcs.updateTransaction($scope.transaction)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.transactions = [];
        $scope.transactions.push($scope.getTransactions());
        $scope.categories = categorySvcs.getCategories().then(function (response) {
            console.log(response);
            $scope.transactions.push($scope.categories);
        });

    }])