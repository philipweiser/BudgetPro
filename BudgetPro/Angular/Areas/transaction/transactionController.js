angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', 'categorySvcs', 'accountSvcs', function ($scope, $state, $stateParams, transactionSvcs, categorySvcs, accountSvcs) {
        $scope.transaction = {
            Id: '',
            AccountName: '',
            Amount: 0,
            ReconciledAmount: 0,
            Date: '',
            Description: '',
            CategoryId: '',
        };
        $scope.categories = $scope.getCategories();
        $scope.accounts = $scope.getBanks();
        $scope.getAccounts = function () {
            transactionSvcs.getAccounts()
                .then(function (response) {
                    $scope.accounts = [];
                    for (i = 0; i < response.length; i++) {
                        $scope.accounts.push(response[i].Name);
                    }
                });
        };
        $scope.getTransactions = function () {
            transactionSvcs.getTransactions()
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
        $scope.transactions = $scope.getTransactions();
    }])