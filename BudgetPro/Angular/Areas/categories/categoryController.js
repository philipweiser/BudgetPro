angular.module('app')
    // Path: /
    .controller('categoryController', ['$scope', '$state', '$stateParams', 'categorySvcs', '$modal', function ($scope, $state, $stateParams, categorySvcs, $modal) {
        $scope.category = {
            Id: '',
            Name: ''
        };
        $scope.categories = '';
        $scope.columns = [{
            name: '',
            width: '80', field: 'Id',
            cellTemplate: '<div class="ui-grid-cell-contents" title="Edit Transaction">' +
                '<input type="button"  ng-click="grid.appScope.whichEdit(row.entity)" class="form-control btn btn-primary" value="Edit" /></div>',
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
            enableFiltering: true,
            paginationPageSizes: [10, 20, 50],
            paginationPageSize: 10,
            enablePaginationControls: true,
        }
        $scope.whichEdit = function (entity) {
            
        }
        $scope.newModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/categories/modal.html',
                size: 'sm',
                controller: 'ModalInstanceCtrl'
            });

        }

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
                });
        };
        $scope.deleteCategory = function (id) {
            categorySvcs.deleteCategory(id)
                .then(function (response) {
                    $scope.getCategories();
                });
        };
        $scope.updateCategory = function () {
            categorySvcs.updateCategory($scope.category)
                .then(function (response) {
                    $scope.getCategories();
                });
        };
        $scope.getCategories();
    }])
angular.module('app').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});