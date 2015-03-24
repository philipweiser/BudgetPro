angular.module('app')
    // Path: /
    .controller('budgetController', ['$scope', '$state', '$stateParams', 'budgetItemSvcs', function ($scope, $state, $stateParams, budgetItemSvcs) {
        $scope.budgetItem = {
            Id: '',
            Description: '',
            CategoryId: '',
            Amount: '',
            Frequency: '',
            CategoryName: '',
        };
        $scope.categories = [];
        $scope.CategoryName = '';
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Budget Item">' +
                '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="btn" value="Edit" /></div>',
            enableSorting: false
        },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Budget Item">' +
                        '<input type="button"  ng-click="grid.appScope.deleteBudgetItem(row.entity.Id)" class="btn" value="Delete" /></div>',
                enableSorting: false
            },
            { name: 'Description' },
            { name: 'Category', field: 'CategoryName' },
            { name: 'Amount' },
            { name: 'Frequency' }
        ];
        $scope.whichEdit = function (entity) {
            $scope.budgetItem = entity;
        }
        $scope.gridOptions = {
            data: 'budgetItems',
            columnDefs: $scope.columns,
        };
        $scope.budgetItems = [];
        $scope.getBudget = function () {
            budgetItemSvcs.getBudget()
                .then(function (response) {
                    $scope.budgetItems = response;
                    for (i = 0; i < response.length; i++) {
                        if ($scope.categories.indexOf(response[i].CategoryName) < 0)
                            $scope.categories.push({ CategoryId: response[i].CategoryId, CategoryName: response[i].CategoryName });
                    }
                });
        };
        $scope.createBudget = function () {
            budgetItemSvcs.createBudgetItem($scope.budgetItem)
                .then(function (response) {
                    $scope.getBudget();
                    $scope.resetFields();
                });
        };
        $scope.deleteBudgetItem = function (id) {
            budgetItemSvcs.deleteBudgetItem(id)
                .then(function (response) {
                    $scope.getBudget();
                    $scope.resetFields();
                });
        };
        $scope.updateBudgetItem = function () {
            if ($scope.categories[$scope.budgetItem.CategoryId] != $scope.budgetItem.CategoryName) {
                $scope.budgetItem.CategoryId = 0;
            }
            budgetItemSvcs.updateBudgetItem($scope.budgetItem)
                .then(function (response) {
                    $scope.getBudget();
                    $scope.resetFields();
                });
        };
        $scope.getBudget();
        $scope.resetFields = function () {
            $scope.budgetItem.Amount = '';
            $scope.budgetItem.Description = '';
            $scope.budgetItem.CategoryName = '';
            $scope.budgetItem.Frequency = '';
        }
    }])