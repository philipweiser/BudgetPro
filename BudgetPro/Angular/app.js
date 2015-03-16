angular.module('app', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'ui.grid'])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: '/Angular/Areas/dashboard/dashboard.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: '/Angular/Areas/accounts/views/login.html',
            })
            .state('register', {
                url: '/register',
                templateUrl: '/Angular/Areas/accounts/views/register.html',
            })
            .state('accmgmt', {
                url: '/Account',
                templateUrl: '/Angular/Areas/accounts/views/accmgmt.html',
            })
            .state('housemgmt', {
                url: '/Household',
                templateUrl: '/Angular/Areas/household/housemgmt.html',
            })
            .state('transmgmt', {
                url: '/Transactions',
                templateUrl: '/Angular/Areas/transaction/transmgmt.html',
            })
            .state('userprofile', {
                url: '/Profile',
                templateUrl: '/Angular/Areas/accounts/views/userprofile.html',
            })
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $httpProvider.interceptors.push('authInterceptorService');

    }])

// Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
// can be injected here. This is to prevent further system configuration during application run time.
.run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {
    // Allows to retrieve UI Router state information from inside templates
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}]);