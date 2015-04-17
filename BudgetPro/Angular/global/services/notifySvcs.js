angular.module('app').factory('notifySvcs', ['Notification', function (Notification) {
    var factory = {};
    factory.primary = function (message) {
        Notification.success(message);
    }
    factory.danger = function (message) {
        Notification.success(message);
    }
    factory.success = function (message) {
        Notification.success(message);
    }
    factory.info = function (message) {
        Notification.success(message);
    }
    factory.warning = function (message) {
        Notification.success(message);
    }
    
    return factory;
}]);