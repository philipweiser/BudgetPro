angular.module('app').factory('categorySvcs', ['$http', function ($http) {
    var factory = {};

    factory.createCategory = function (element) {
        return $http.post('/api/Category/Create', element)
                    .then(function (response) {
                        return response.data;
                    });
    };
    factory.deleteCategory = function (element) {
        return $http.post('/api/Category/Delete', element)
                .then(function (response) {
                    return response.data;
                });
    };
    factory.getCategories = function () {
        return $http.get('/api/Category/GetCategories')
                    .then(function (response) {
                        return response.data;
                    });
    };
    factory.updateCategory = function (element) {
        return $http.post('/api/Category/Edit', element)
            .then(function (response) {
                return response.data;
            });
    };
    return factory;
}]);