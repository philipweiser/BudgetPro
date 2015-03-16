angular.module('app').directive('memberDisplay', function () {
    return {
        restrict: 'AEC',
        templateUrl: 'Angular/Areas/household/templates/memberDisplay.html',
        replace: true
    };
});
angular.module('app').directive('inviteInput', function () {
    return {
        templateUrl: 'Angular/Areas/household/templates/inviteInput.html',
        replace: true
    };
});
angular.module('app').directive('leaveHousehold', function () {
    return {
        templateUrl: 'Angular/Areas/household/templates/leaveHousehold.html',
        replace: true
    };
});
angular.module('app').directive('createHousehold', function () {
    return {
        templateUrl: 'Angular/Areas/household/templates/createHousehold.html',
        replace: true
    };
});