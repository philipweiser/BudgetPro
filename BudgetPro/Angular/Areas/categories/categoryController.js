angular.module('app')
    // Path: /
    .controller('categoryController', ['$scope', '$state', '$stateParams', 'categorySvcs', function ($scope, $state, $stateParams, categorySvcs) {
        $scope.category = {
            Id: '',
            Name: ''
        };
        $scope.categories = '';
        $scope.getCategories = function () {
            categorySvcs.getCategories()
                .then(function (response) {
                    $scope.categories = response;
                });
        };
        $scope.createCategory = function () {
            categorySvcs.createCategory($scope.category)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.deleteCategory = function () {
            categorySvcs.deleteCategory($scope.category.Id)
                .then(function (response) {
                    console.log(response);
                });
        };
        $scope.updateCategory = function () {
            categorySvcs.updateCategory($scope.category)
                .then(function (response) {
                    console.log(response);
                });
        };
    }])