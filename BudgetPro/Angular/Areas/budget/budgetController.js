angular.module('app')
    // Path: /
    .controller('budgetController', ['$scope', '$state', '$stateParams', 'budgetItemSvcs', function ($scope, $state, $stateParams, budgetItemSvcs) {
        $scope.budgetItem = {
            Id: '5',
            Description: '',
            CategoryId: '',
            Amount: '',
            Frequency: ''
        };
        $scope.budgetItems = '';
        $scope.getBudget = function () {
            budgetItemSvcs.getBudget()
                .then(function (response) {
                    $scope.budgetItems = response;
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