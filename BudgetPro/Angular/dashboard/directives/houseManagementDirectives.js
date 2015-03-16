angular.module('app').directive('memberDisplay', function () {
    return {
        restrict: 'AEC',
        templateUrl: 'Angular/dashboard/directives/templates/memberDisplay.html',
        replace: true
    };
});
angular.module('app').directive('inviteInput', function () {
    return {
        templateUrl: 'Angular/dashboard/directives/templates/inviteInput.html',
        replace: true
    };
});
angular.module('app').directive('leaveHousehold', function () {
    return {
        templateUrl: 'Angular/dashboard/directives/templates/leaveHousehold.html',
        replace: true
    };
});