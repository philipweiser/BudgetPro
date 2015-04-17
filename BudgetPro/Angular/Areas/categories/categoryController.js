angular.module('app')
    // Path: /
    .controller('categoryController', ['$scope', '$state', '$stateParams', 'categorySvcs', '$modal', 'notifySvcs', function ($scope, $state, $stateParams, categorySvcs, $modal, notifySvcs) {
        $scope.category = {
            Id: '',
            Name: ''
        };
        $scope.categories = '';
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Transaction">' +
                '<input type="button"  ng-click="grid.appScope.editModal(row.entity)" class="form-control btn btn-primary" value="Edit" /></div>',
            enableSorting: false,
            enableFiltering: false,
            enableColumnMenu: false
        },
            {
                name: ' ',
                width: '80', field: 'Id',
                cellTemplate: '<div class="ui-grid-cell-contents" title="Delete Transaction">' +
                        '<input type="button"  ng-click="grid.appScope.deleteCategory(row.entity.Id)" class="form-control btn btn-danger" value="Delete" /></div>',
                enableSorting: false,
                enableFiltering: false,
                enableColumnMenu: false
            },
            {
                name: 'Name',
                enableColumnMenu: false
            },
        ];
        $scope.gridOptions = {
            data: 'categories',
            columnDefs: $scope.columns,
            minRowsToShow: '10',
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls: true,
        }
        $scope.newModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/categories/createModal.html',
                size: 'sm',
                controller: 'newCategoryModalController',
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.Name = response;
                    $scope.createCategory();
                }
            }
        )
        };
        $scope.editModal = function (entity) {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/categories/editModal.html',
                size: 'sm',
                controller: 'editCategoryModalController',
                resolve: {
                    entity: function () {
                        return entity;
                    }
                }
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    $scope.category = response;
                    $scope.updateCategory();
                }
            }
        )
        };
        $scope.getCategories = function () {
            categorySvcs.getCategories()
                .then(function (response) {
                    $scope.categories = response;
                });
        };
        $scope.createCategory = function () {
            categorySvcs.createCategory($scope.category)
                .then(function (response) {
                    $scope.getCategories();
                    if (response.status = 200) {
                        notifySvcs.success("Changes Saved.");
                    }
                });
        };
        $scope.deleteCategory = function (id) {
            categorySvcs.deleteCategory(id)
                .then(function (response) {
                    $scope.getCategories();
                    if (response.status = 200) {
                        notifySvcs.success("Changes Saved.");
                    }
                });
        };
        $scope.updateCategory = function () {
            categorySvcs.updateCategory($scope.category)
                .then(function (response) {
                    $scope.getCategories();
                    if (response.status = 200) {
                        notifySvcs.success("Changes Saved.");
                    }
                });
        };
        $scope.getCategories();
    }])
angular.module('app').controller('newCategoryModalController', function ($scope, $modalInstance) {
    $scope.ok = function () {
        if($scope.Name != undefined)
            $modalInstance.close($scope.Name);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
angular.module('app').controller('editCategoryModalController', function ($scope, $modalInstance, entity) {
    $scope.entity = entity;
    $scope.ok = function () {
        if ($scope.entity != undefined)
            $modalInstance.close($scope.entity);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});