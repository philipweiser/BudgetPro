angular.module('app')
    // Path: /
    .controller('dashboardController', ['$scope', '$state', '$stateParams', 'dashSvcs', function ($scope, $state, $stateParams, dashSvcs) {
        $scope.getDashboard = function () {
            dashSvcs.getDash().then(function (response) {
                console.log(response);
                $scope.dashboard = response;
                $scope.accounts = $scope.dashboard.MyAccounts;
                $scope.transactions = $scope.dashboard.RecentTransactions;
                $scope.budgetItems = $scope.dashboard.MyBudget;
                $scope.makeBudget($scope.budgetItems);
            });
        }
        $scope.options = { width: 500, height: 300, 'bar': 'aaa' };
        //$scope.data = [1, 2, 3, 4];
        $scope.hovered = function (d) {
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.data = [];
        $scope.barValue = 'None';
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
angular.module('app').directive('bars', function ($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="chart"></div>',
        link: function (scope, element, attrs) {
            var data = attrs.data.split(','),
            chart = d3.select('#chart')
              .append("div").attr("class", "chart")
              .selectAll('div')
              .data(data).enter()
              .append("div")
              .transition().ease("elastic")
              .style("width", function(d) { return d + "%"; })
              .text(function(d) { return d + "%"; });
        } 
    };
});