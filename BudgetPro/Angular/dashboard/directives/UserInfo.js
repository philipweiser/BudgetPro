angular.module('app').directive('userInfo', function () {
    return {
        restrict: 'AEC',
        templateUrl: 'Angular/dashboard/views/templates/UserInfo.html',
        replace: true
    };
});