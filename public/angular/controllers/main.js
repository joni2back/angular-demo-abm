(function(angular) {
    "use strict";
    angular.module('TestApp').controller('MainCtrl', ['$scope', '$route', '$location', 'authService', function($scope, $route, $location, authService) {

        $scope.$route = $route;
        $scope.authService = authService;

        $scope.logout = function () {
            authService.logOut();
            $location.path('/');
        };

    }]);
})(angular);