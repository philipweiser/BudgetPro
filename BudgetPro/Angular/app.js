angular.module('app', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'ui.grid', 'ui.grid.pagination', 'nvd3'])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: '/Angular/Areas/dashboard/dashboard.html',
                data: {
                    Authorize: "All"
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: '/Angular/Areas/accounts/views/login.html',
                data: {
                    Authorize: "Anonymous"
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: '/Angular/Areas/accounts/views/register.html',
                data: {
                    Authorize: "Anonymous"
                }
            })
            .state('bank', {
                url: '/Bank',
                templateUrl: '/Angular/Areas/bank/bank.html',
                data: {
                    Authorize: "All"
                }
            })
            .state('housemgmt', {
                url: '/Household',
                templateUrl: '/Angular/Areas/household/housemgmt.html',
                data: {
                    Authorize: "All"
                }
            })
            .state('transaction', {
                url: '/Transactions',
                templateUrl: '/Angular/Areas/transaction/transaction.html',
                data: {
                    Authorize: "All"
                }
            })
            //.state('userprofile', {
            //    url: '/Profile',
            //    templateUrl: '/Angular/Areas/accounts/views/userprofile.html',
            //})
            .state('budget', {
                url: '/Budget',
                templateUrl: '/Angular/Areas/budget/budget.html',
                data: {
                    Authorize: "All"
                }
            })
        //.state('category', {
        //    url: '/Categories',
        //    templateUrl: '/Angular/Areas/categories/category.html',
        //})
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $httpProvider.interceptors.push('authInterceptorService');

    }])

// Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'authService', function ($templateCache, $rootScope, $state, $stateParams, authService) {
        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        authService.fillAuthData();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //For later improved security
            var authorized = false;

            if (toState.data.Authorize.indexOf("Anonymous") > -1)
                authorized = true
            else {
                if (authService.authentication.isAuth) {

                    if (toState.data.Authorize.indexOf("All") > -1)
                        authorized = true;
                    else {
                        angular.forEach(authService.authentication.Roles, function (value, key) {
                            if (toState.Authorize.data.indexOf(value))
                                authorized = true;
                        });
                    }
                }
            }
            if (authorized == false) {
                event.preventDefault();
                authService.logout();
                $state.go('login');
            }
        });

    }]);