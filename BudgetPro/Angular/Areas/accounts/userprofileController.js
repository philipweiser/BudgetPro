angular.module('app')
    // Path: /
    .controller('userprofileController', ['$scope', '$state', '$stateParams', 'userSvcs', '$modal', function ($scope, $state, $stateParams, userSvcs, $modal) {
        $scope.user = {
            Id: '',
            Name: '',
            Email: '',
            Household: '',
            UserName: ''
        };
        $scope.notification = {
            status : '',
            message : '',
            type:''
        }
        $scope.getUser = function () {
            userSvcs.getUser().then(function (response) {
                $scope.user = response;
            });
        }
        $scope.successAlert = false;
        $scope.updateUser = function () {
            userSvcs.updateUser($scope.user);
        }
        $scope.changePassword = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/Angular/Areas/accounts/views/changePassword.html',
                size: 'sm',
                controller: 'changePasswordModalController',
            });
            $scope.modalInstance.result.then(function (response) {
                if (response != undefined) {
                    userSvcs.setPassword(response).then(function (response) {
                        console.log(response);
                        if (response.status == "200") {
                            $scope.notification.status = 'show';
                            $scope.notification.message = 'Oh yeah!';
                            $scope.notification.type = 'info';
                        }
                    });
                }
            }
        )
        };
        $scope.getUser();
    }]);
angular.module('app').controller('changePasswordModalController', function ($scope, $modalInstance) {
    $scope.entity = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    }
    $scope.ok = function () {
        $modalInstance.close($scope.entity);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});