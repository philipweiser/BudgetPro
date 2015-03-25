angular.module('app')
    // Path: /
    .controller('budgetController', ['$scope', '$state', '$stateParams', 'budgetItemSvcs', 'categorySvcs', function ($scope, $state, $stateParams, budgetItemSvcs, categorySvcs) {
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
            enableSorting: false,
            enableFiltering: false,
            enableColumnMenu: false,
        },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Budget Item">' +
                        '<input type="button"  ng-click="grid.appScope.deleteBudgetItem(row.entity.Id)" class="btn" value="Delete" /></div>',
                enableSorting: false,
                enableFiltering: false,
                enableColumnMenu: false,
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
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls:true,
        };
        $scope.budgetItems = [];
        $scope.getBudget = function () {
            budgetItemSvcs.getBudget()
                .then(function (response) {
                    $scope.budgetItems = response;
                });
        };
        $scope.getCategories = function () {
            categorySvcs.getCategories().then(function (response) {
                $scope.categories = response;
            });
        }
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
            budgetItemSvcs.updateBudgetItem($scope.budgetItem)
                .then(function (response) {
                    $scope.getBudget();
                    $scope.resetFields();
                });
        };
        $scope.getBudget();
        $scope.getCategories();
        $scope.resetFields = function () {
            $scope.budgetItem.Amount = '';
            $scope.budgetItem.Description = '';
            $scope.budgetItem.CategoryName = '';
            $scope.budgetItem.Frequency = '';
        }
    }])