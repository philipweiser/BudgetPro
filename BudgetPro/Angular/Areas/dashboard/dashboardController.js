angular.module('app')
    // Path: /
    .controller('dashboardController', ['$scope', '$state', '$stateParams', 'dashSvcs', '$location', function ($scope, $state, $stateParams, dashSvcs, $location) {
        $scope.getDashboard = function () {
            dashSvcs.getDash().then(function (response) {
                if (response.HouseholdId != 0) {
                    $scope.dashboard = response;
                    $scope.accounts = $scope.dashboard.MyAccounts;
                    $scope.transactions = $scope.dashboard.RecentTransactions;
                    $scope.graphData = $scope.dashboard.MyGraph;
                    $scope.makeBudget($scope.graphData);
                } else {
                    $location.path("/Household");
                }
            });
        }
        $scope.makeBudget = function (inData) {
            var bData = [];
            var tData = [];
            var labels = [];
            for (i = 0; i < inData.length; i++) {
                if (inData[i].BudgetedAmount != 0 || inData[i].ActualAmount != 0) {
                    bData.push({ "x": i, "y": Math.abs(inData[i].BudgetedAmount), "label": inData[i].Name });
                    tData.push({ "x": i, "y": Math.abs(inData[i].ActualAmount), "label": inData[i].Name });
                    labels.push(inData[i].Name);
                }
            }
            var data = [{ key: "Budgeted Spending", values: bData }, { key: "Actual Spending", values: tData }]
            nv.addGraph(function () {
                var chart = nv.models.multiBarChart().tooltipContent(function (key, y, e, graph) {
                    return '<h3>' + key + '</h3>' +
                        '<p>$' + formatCurrency(e) + ' on ' + graph.point.label + '</p>';
                });

                chart.xAxis.tickFormat(function (d, i) {
                    return labels[i]
                });
                var formatCurrency = function (e) { return parseFloat(e.replace(/,/g,'')).toFixed(2)}
                chart.yAxis
                    .tickFormat(d3.format(',.2f'));
                d3.select('#chart svg')
                    .datum(data)
                    .transition().duration(500)
                    .call(chart)
                ;
                nv.utils.windowResize(chart.update);

                return chart;
            });
        }
        $scope.getDashboard();
    }]);