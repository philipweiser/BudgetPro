angular.module('app')
    // Path: /
    .controller('budgetController', ['$scope', '$state', '$stateParams', 'budgetItemSvcs', function ($scope, $state, $stateParams, budgetItemSvcs) {
        $scope.budgetItem = {
            Id: '5',
            Description: '',
            CategoryId: '',
            HouseholdId: '',
            Amount: '',
            Frequency: '',
            ReconciledAmount: ''
        };
        $scope.getBudget = function () {
            budgetItemSvcs.getBudget()
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.createBudget = function () {
            budgetItemSvcs.createBudgetItem($scope.budgetItem)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.deleteBudgetItem = function () {
            budgetItemSvcs.deleteBudgetItem($scope.budgetItem.Id)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.updateBudgetItem = function () {
            budgetItemSvcs.updateBudgetItem($scope.budgetItem)
                .then(function (response) {
                    console.log(response);
                });
        };
    }])