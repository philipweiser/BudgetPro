angular.module('app')
    // Path: /
    .controller('budgetController', ['$scope', '$state', '$stateParams', 'budgetItemSvcs', 'categorySvcs', '$location', '$modal', function ($scope, $state, $stateParams, budgetItemSvcs, categorySvcs, $location, $modal) {
        $scope.budgetItems = [];
        $scope.getBudget = function () {
            budgetItemSvcs.getBudget()
                .then(function (response) {
                    if (response != undefined) {
                        $scope.budgetItems = response.data;
                    } else {
                        $location.path("/Household");
                    }
                });
        };
        $scope.getBudget();
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
                '<input type="button"  ng-click="grid.appScope.editModal(row.entity)" class="btn btn-primary" value="Edit" /></div>',
            enableSorting: false,
            enableFiltering: false,
            enableColumnMenu: false,
        },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Budget Item">' +
                        '<input type="button"  ng-click="grid.appScope.deleteBudgetItem(row.entity.Id)" class="btn btn-danger" value="Delete" /></div>',
                enableSorting: false,
                enableFiltering: false,
                enableColumnMenu: false,
            },
            { name: 'Description' },
            { name: 'Category', field: 'CategoryName' },
            { name: 'Amount', cellFilter:'currency' },
            { name: 'Frequency/Year', field: 'Frequency' }
        ];
        $scope.gridOptions = {
            data: 'budgetItems',
            columnDefs: $scope.columns,
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls: true,
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
        $scope.getCategories();
        $scope.resetFields = function () {
            $scope.budgetItem.Amount = '';
            $scope.budgetItem.Description = '';
            $scope.budgetItem.CategoryName = '';
            $scope.budgetItem.Frequency = '';
        }

        $scope.newModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/budget/createModal.html',
                size: 'sm',
                controller: 'newBIModalController',
                resolve: {
                    categories: function () {
                        return $scope.categories;
                    }
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.budgetItem = response;
                    $scope.createBudget();
                }
            }
        )
        };
        $scope.editModal = function (entity) {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/budget/editModal.html',
                size: 'sm',
                controller: 'editBIModalController',
                resolve: {
                    entity: function () {
                        return entity;
                    },
                    categories: function(){
                        return $scope.categories;
                    }
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.budgetItem = response;
                    $scope.updateBudgetItem();
                }
            }
        )
        };
    }])

angular.module('app').controller('newBIModalController', function ($scope, $modalInstance, categories) {
    $scope.categories = categories;
    $scope.isComplete = false;
    $scope.budgetItem = {
        Description: '',
        Amount: '',
        Frequency: '',
        CategoryName: '',
        isDebit: true,
    };
    $scope.isDebit = true;
    $scope.ok = function () {
        if ($scope.budgetItem.Description != '' &&
            $scope.budgetItem.CategoryName != '' &&
            $scope.budgetItem.Frequency != '' &&
            $scope.budgetItem.CategoryName != '')
            $scope.isComplete = true;
        if ($scope.isComplete) {
            if ($scope.budgetItem.isDebit) {
                $scope.budgetItem.Amount = -$scope.budgetItem.Amount;
            }
            $scope.budgetItem.CategoryId = $scope.budgetItem.CategoryName.Name.Id;
            $scope.budgetItem.CategoryName = $scope.budgetItem.CategoryName.Name.Name;
            $modalInstance.close($scope.budgetItem);
        }
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
angular.module('app').controller('editBIModalController', function ($scope, $modalInstance, entity, categories) {
    $scope.budgetItem = entity;
    $scope.categories = categories;
    $scope.isDebit = false;
    if ($scope.budgetItem.Amount < 0) {
        $scope.isDebit = true;
    }
    $scope.ok = function () {
        if ($scope.budgetItem != undefined) {
            if ($scope.isDebit == true) {
                $scope.budgetItem.Amount = -Math.abs($scope.budgetItem.Amount);
            } else {
                $scope.budgetItem.Amount = Math.abs($scope.budgetItem.Amount);
            }
            $modalInstance.close($scope.budgetItem);
        }
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});