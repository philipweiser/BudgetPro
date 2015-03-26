angular.module('app')
    // Path: /
    .controller('dashboardController', ['$scope', '$state', '$stateParams', 'dashSvcs', '$location', function ($scope, $state, $stateParams, dashSvcs, $location) {
        $scope.getDashboard = function () {
            dashSvcs.getDash().then(function (response) {
                if(response.HouseholdId != 0){
                $scope.dashboard = response;
                $scope.accounts = $scope.dashboard.MyAccounts;
                $scope.transactions = $scope.dashboard.RecentTransactions;
                $scope.budgetItems = $scope.dashboard.MyBudget;
                $scope.makeBudget($scope.budgetItems);
                } else {
                    $location.path("/Household");
                }
            });
        }
        $scope.hovered = function (d) {
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.data = [];
        $scope.getDashboard();
        $scope.makeBudget= function (data){
            debits = 0;
            credits = 0;
            for(i = 0; i < data.length; i++){
                if (data.Amount < 0) {
                    debits -= data.Amount;
                } else {
                    credits += data.Amount;
                }
            }
            $scope.data = [debits, credits]
        }
    }]);