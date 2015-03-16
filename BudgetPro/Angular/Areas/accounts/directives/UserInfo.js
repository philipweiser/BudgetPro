angular.module('app').directive('userInfo', function () {
    return {
        restrict: 'AEC',
        templateUrl: 'Angular/Areas/accounts/views/UserInfo.html',
        replace: true
    };
});