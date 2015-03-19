angular.module('app')
    // Path: /
    .controller('transactionController', ['$scope', '$state', '$stateParams', 'transactionSvcs', function ($scope, $state, $stateParams, transactionSvcs) {
        $scope.transaction = {
            Id: '',
            AccountId: '',
            Amount: '',
            AbsAmount: '',
            ReconciledAmount: '',
            AbsReconciledAmount: '',
            Date: '',
            Description: '',
            Updated: '',
            UpdatedByUserId: '',
            CategoryId: '',
        };
        $scope.transactions = '';
        $scope.getTransactions = function () {
            transactionSvcs.getTransactions()
                .then(function (response) {
                    $scope.transactions = response;
                });
        };
        $scope.createTransaction = function () {
            transactionSvcs.createTransaction($scope.transaction)
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
    }])