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
        $scope.options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 50
                },
                x: function (d) { return d[0]; },
                y: function (d) { return d[1] / 100000; },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 50,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Budgeted Money',
                    axisLabelDistance: 35,
                    tickFormat: function (d) {
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };
        $scope.getDashboard();
        $scope.makeBudget= function (data){
            var debits = 0;
            var credits = 0;
            for(i = 0; i < data.length; i++){
                if (data[i].Amount < 0) {
                    debits -= data[i].Amount;
                } else {
                    credits += data[i].Amount;
                }
            }
            
            $scope.data = [
            {
                "key": "Budgeted Money",
                "bar": true,
                "values":[["1", debits], ["2", credits]]
            }];
        }
    }]);